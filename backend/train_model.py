import os
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("fraud.csv")

# Encode categorical columns
transaction_encoder = LabelEncoder()
payment_encoder = LabelEncoder()

df["transaction_type"] = transaction_encoder.fit_transform(
    df["transaction_type"]
)

df["payment_method"] = payment_encoder.fit_transform(
    df["payment_method"]
)

# Features & Target
X = df.drop("is_fraud", axis=1)
y = df["is_fraud"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)

# Train Random Forest
model = RandomForestClassifier(
    n_estimators=500,
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    class_weight="balanced",
    random_state=42,
    n_jobs=-1,
)

model.fit(X_train, y_train)

accuracy = accuracy_score(
    y_test,
    model.predict(X_test),
)

print(f"\nModel Accuracy : {accuracy*100:.2f}%")

# Save everything
os.makedirs("models", exist_ok=True)

joblib.dump(model, "models/random_forest.pkl")
joblib.dump(transaction_encoder, "models/transaction_encoder.pkl")
joblib.dump(payment_encoder, "models/payment_encoder.pkl")

print("\nRandom Forest Model Saved Successfully.")