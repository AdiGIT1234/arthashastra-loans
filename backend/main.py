from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base, LoanProduct
from services.comparison import compare_loans

# ---------------- APP INIT ----------------
app = FastAPI(title="Arthashastra Backend")

# ---------------- CORS (IMPORTANT FIX) ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
    ],
    allow_credentials=False,  # IMPORTANT: avoid silent fetch issues
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)

# ---------------- DB INIT ----------------
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- ROUTES ----------------
@app.get("/")
def health_check():
    return {"status": "Backend running"}

@app.get("/compare")
def compare_endpoint(
    amount: int = Query(..., gt=0),
    tenure: int = Query(..., gt=0),
    db: Session = Depends(get_db),
):
    loans = db.query(LoanProduct).all()

    comparisons = compare_loans(loans, amount, tenure)

    return {
        "best_option": comparisons[0]["bank"] if comparisons else None,
        "comparisons": comparisons,
    }
