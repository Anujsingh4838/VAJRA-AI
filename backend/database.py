import sqlite3
from datetime import datetime

DATABASE_NAME = "transactions.db"


def create_table():
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            transaction_type TEXT NOT NULL,
            payment_method TEXT NOT NULL,
            account_age INTEGER NOT NULL,
            failed_transactions INTEGER NOT NULL,
            fraud_score INTEGER NOT NULL,
            confidence REAL NOT NULL,
            decision TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )

    connection.commit()
    connection.close()


def save_transaction(payment, result):
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO transactions (
            amount,
            transaction_type,
            payment_method,
            account_age,
            failed_transactions,
            fraud_score,
            confidence,
            decision,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payment.amount,
            payment.transaction_type,
            payment.payment_method,
            payment.account_age,
            payment.failed_transactions,
            result["fraud_score"],
            result["confidence"],
            result["decision"],
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        ),
    )

    connection.commit()
    connection.close()


def get_transactions():
    connection = sqlite3.connect(DATABASE_NAME)
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT *
        FROM transactions
        ORDER BY id DESC
        LIMIT 20
        """
    )

    rows = cursor.fetchall()
    connection.close()

    return [dict(row) for row in rows]
def get_statistics():
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) FROM transactions")
    total_transactions = cursor.fetchone()[0]

    cursor.execute(
        """
        SELECT COUNT(*)
        FROM transactions
        WHERE decision = 'Approved'
        """
    )
    approved_transactions = cursor.fetchone()[0]

    cursor.execute(
        """
        SELECT COUNT(*)
        FROM transactions
        WHERE decision = 'Manual Review'
        """
    )
    manual_review_transactions = cursor.fetchone()[0]

    cursor.execute(
        """
        SELECT COUNT(*)
        FROM transactions
        WHERE decision = 'Declined'
        """
    )
    declined_transactions = cursor.fetchone()[0]

    cursor.execute(
        """
        SELECT AVG(fraud_score)
        FROM transactions
        """
    )
    average_score = cursor.fetchone()[0]

    connection.close()

    return {
        "total_transactions": total_transactions,
        "approved_transactions": approved_transactions,
        "manual_review_transactions": manual_review_transactions,
        "declined_transactions": declined_transactions,
        "average_fraud_score": round(average_score or 0, 1),
    }