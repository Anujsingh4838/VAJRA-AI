from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import PaymentRequest
from model import predict_fraud
from database import (
    create_table,
    save_transaction,
    get_transactions,
    get_statistics,
)

app = FastAPI(
    title="VAJRA Fraud Detection API",
    version="1.0.0",
)

# -----------------------------
# CORS Configuration
# -----------------------------

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://vajra-ai-neon.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Startup
# -----------------------------

@app.on_event("startup")
def startup():
    create_table()

# -----------------------------
# Home
# -----------------------------

@app.get("/")
def home():
    return {
        "message": "VAJRA Fraud Detection API is running"
    }

# -----------------------------
# Predict
# -----------------------------

@app.post("/predict")
def predict(payment: PaymentRequest):

    result = predict_fraud(payment)

    save_transaction(payment, result)

    return {
        **result,
        "amount": payment.amount,
        "transaction_type": payment.transaction_type,
        "payment_method": payment.payment_method,
    }

# -----------------------------
# Transactions
# -----------------------------

@app.get("/transactions")
def transactions():
    return get_transactions()

# -----------------------------
# Statistics
# -----------------------------

@app.get("/statistics")
def statistics():
    return get_statistics()