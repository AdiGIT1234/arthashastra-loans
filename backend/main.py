from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from services.eligibility import check_eligibility
from database import engine, SessionLocal
from models import Base, LoanProduct
from services.comparison import compare_loans

# ---------------- APP INIT ----------------
app = FastAPI(title="Arthashastra Backend")

# ---------------- CORS (IMPORTANT FIX) ----------------
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔒 allow ALL during development
    allow_methods=["*"],
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
@app.post("/eligibility")
def eligibility_check(
    monthly_income: int,
    existing_emi: int,
    age: int,
    employment_type: str,
    loan_amount: int,
    tenure: int,
    db: Session = Depends(get_db),
):
    # Use lowest interest rate for conservative eligibility
    loan = db.query(LoanProduct).order_by(LoanProduct.interest_rate).first()

    result = check_eligibility(
        monthly_income=monthly_income,
        existing_emi=existing_emi,
        age=age,
        employment_type=employment_type,
        loan_amount=loan_amount,
        tenure_months=tenure,
        interest_rate=loan.interest_rate,
    )

    return result
