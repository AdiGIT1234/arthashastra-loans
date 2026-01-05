from database import SessionLocal
from models import LoanProduct

db = SessionLocal()

# Clear existing data (safe for dev)
db.query(LoanProduct).delete()

loan_products = [
    LoanProduct(bank="National Bank", interest_rate=10.5, processing_fee_percent=1),
    LoanProduct(bank="Trust Finance", interest_rate=11.0, processing_fee_percent=0.5),
    LoanProduct(bank="People's Bank", interest_rate=11.5, processing_fee_percent=0),
    LoanProduct(bank="Urban Credit", interest_rate=12.0, processing_fee_percent=0.75),
]

db.add_all(loan_products)
db.commit()
db.close()

print("Seed data inserted successfully")
