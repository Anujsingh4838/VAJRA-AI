import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


df = pd.read_csv("fraud.csv")

features = [
    "amount",
    "transaction_type",
    "payment_method",
    "account_age",
    "failed_transactions",
]

target = "is_fraud"

X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)

numeric_features = [
    "amount",
    "account_age",
    "failed_transactions",
]

categorical_features = [
    "transaction_type",
    "payment_method",
]

random_forest_preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features,
        ),
        (
            "numeric",
            "passthrough",
            numeric_features,
        ),
    ]
)

neural_network_preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(
                handle_unknown="ignore",
                sparse_output=False,
            ),
            categorical_features,
        ),
        (
            "numeric",
            StandardScaler(),
            numeric_features,
        ),
    ]
)

random_forest_model = Pipeline(
    steps=[
        (
            "preprocessor",
            random_forest_preprocessor,
        ),
        (
            "classifier",
            RandomForestClassifier(
                n_estimators=300,
                max_depth=15,
                min_samples_split=5,
                class_weight="balanced",
                random_state=42,
                n_jobs=-1,
            ),
        ),
    ]
)

neural_network_model = Pipeline(
    steps=[
        (
            "preprocessor",
            neural_network_preprocessor,
        ),
        (
            "classifier",
            MLPClassifier(
                hidden_layer_sizes=(128, 64, 32),
                activation="relu",
                solver="adam",
                learning_rate_init=0.001,
                max_iter=300,
                early_stopping=True,
                random_state=42,
            ),
        ),
    ]
)

print("Training Random Forest model...")
random_forest_model.fit(X_train, y_train)

print("Training Neural Network model...")
neural_network_model.fit(X_train, y_train)

rf_predictions = random_forest_model.predict(X_test)
nn_predictions = neural_network_model.predict(X_test)

rf_accuracy = accuracy_score(y_test, rf_predictions)
nn_accuracy = accuracy_score(y_test, nn_predictions)

print("\nRandom Forest Accuracy:", round(rf_accuracy * 100, 2), "%")
print("Neural Network Accuracy:", round(nn_accuracy * 100, 2), "%")

print("\nRandom Forest Report:")
print(classification_report(y_test, rf_predictions))

print("\nNeural Network Report:")
print(classification_report(y_test, nn_predictions))

joblib.dump(
    random_forest_model,
    "random_forest_model.pkl",
)

joblib.dump(
    neural_network_model,
    "neural_network_model.pkl",
)

print("\nModels saved successfully")