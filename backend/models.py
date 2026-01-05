from sqlalchemy import Column, Integer, String, Float
from database import Base

class LoanProduct(Base):
    __tablename__ = "loan_products"

    id = Column(Integer, primary_key=True, index=True)
    bank = Column(String, unique=True, nullable=False)
    interest_rate = Column(Float, nullable=False)
    processing_fee_percent = Column(Float, nullable=False)
