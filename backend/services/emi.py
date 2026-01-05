def calculate_emi(principal: int, annual_rate: float, months: int) -> int:
    monthly_rate = annual_rate / 12 / 100
    emi = (
        principal
        * monthly_rate
        * (1 + monthly_rate) ** months
        / ((1 + monthly_rate) ** months - 1)
    )
    return round(emi)
