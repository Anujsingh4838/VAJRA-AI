import random
import pandas as pd

random.seed(42)

transaction_types = [
    "Online Purchase",
    "Money Transfer",
    "Bill Payment",
    "Cash Withdrawal",
]

payment_methods = [
    "Credit Card",
    "Debit Card",
    "UPI",
    "Net Banking",
]

data = []

for _ in range(10000):
    amount = round(random.uniform(100, 150000), 2)
    transaction_type = random.choice(transaction_types)
    payment_method = random.choice(payment_methods)
    account_age = random.randint(1, 2500)
    failed_transactions = random.randint(0, 10)

    fraud_probability = 0.03

    if amount > 50000:
        fraud_probability += 0.20

    if amount > 100000:
        fraud_probability += 0.20

    if failed_transactions > 3:
        fraud_probability += 0.20

    if failed_transactions > 7:
        fraud_probability += 0.15

    if account_age < 30:
        fraud_probability += 0.20

    if account_age < 7:
        fraud_probability += 0.15

    if payment_method == "Credit Card":
        fraud_probability += 0.05

    if transaction_type == "Money Transfer":
        fraud_probability += 0.08

    fraud_probability = min(fraud_probability, 0.95)

    is_fraud = 1 if random.random() < fraud_probability else 0

    data.append(
        {
            "amount": amount,
            "transaction_type": transaction_type,
            "payment_method": payment_method,
            "account_age": account_age,
            "failed_transactions": failed_transactions,
            "is_fraud": is_fraud,
        }
    )

df = pd.DataFrame(data)

df.to_csv("fraud.csv", index=False)

print("Dataset generated successfully")
print("Total transactions:", len(df))
print("Fraud transactions:", df["is_fraud"].sum())
print("Genuine transactions:", (df["is_fraud"] == 0).sum())