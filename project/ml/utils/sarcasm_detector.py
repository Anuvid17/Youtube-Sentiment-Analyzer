import joblib
import os

base_dir = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(base_dir, "..", "model", "sarcasm_model.pkl")
vectorizer_path = os.path.join(base_dir, "..", "model", "sarcasm_vectorizer.pkl")

sarcasm_model = joblib.load(model_path)
sarcasm_vectorizer = joblib.load(vectorizer_path)

def is_sarcastic(text: str) -> bool:
    vec = sarcasm_vectorizer.transform([text])
    return sarcasm_model.predict(vec)[0] == 1
