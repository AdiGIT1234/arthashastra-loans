from .emi import calculate_emi


def check_eligibility(
    monthly_income: int,
    existing_emi: int,
    age: int,
    employment_type: str,
    loan_amount: int,
    tenure_months: int,
    interest_rate: float,
):
    reasons = []

    # Employment rule
    if employment_type not in ("salaried", "self-employed"):
        reasons.append("Unsupported employment type")

    # Age rule
    tenure_years = tenure_months / 12
    if age < 21:
        reasons.append("Applicant must be at least 21 years old")
    if age + tenure_years > 60:
        reasons.append("Loan tenure exceeds retirement age")

    # Loan amount rule
    max_loan_allowed = monthly_income * 60
    if loan_amount > max_loan_allowed:
        reasons.append("Requested loan amount exceeds eligible limit")

    # FOIR rule
    new_emi = calculate_emi(loan_amount, interest_rate, tenure_months)
    total_emi = existing_emi + new_emi
    foir = total_emi / monthly_income

    if foir > 0.4:
        reasons.append("EMI exceeds 40% of monthly income")

    eligible = len(reasons) == 0

    return {
        "eligible": eligible,
        "monthly_emi": new_emi,
        "foir": round(foir, 2),
        "max_eligible_loan": max_loan_allowed,
        "reasons": reasons,
    }
