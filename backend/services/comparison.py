from .emi import calculate_emi

def compare_loans(loans, amount: int, tenure: int):
    results = []

    for loan in loans:
        emi = calculate_emi(amount, loan.interest_rate, tenure)
        total_payment = emi * tenure
        processing_fee = (amount * loan.processing_fee_percent) / 100
        total_cost = total_payment + processing_fee

        results.append({
            "bank": loan.bank,
            "interest_rate": loan.interest_rate,
            "emi": emi,
            "total_interest": total_payment - amount,
            "processing_fee": processing_fee,
            "total_cost": total_cost,
        })

    results.sort(key=lambda x: x["total_cost"])
    return results
