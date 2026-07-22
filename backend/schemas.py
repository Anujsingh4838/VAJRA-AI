from pydantic import BaseModel

class PaymentRequest(BaseModel):
    amount: float
    transaction_type: str
    payment_method: str
    account_age: int
    failed_transactions: int