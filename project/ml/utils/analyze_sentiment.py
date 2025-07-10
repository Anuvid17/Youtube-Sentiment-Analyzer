import pandas as pd
import joblib
import os
from .preprocess_comments import preprocess_text
from .sarcasm_detector import is_sarcastic  # New import

def analyze_sentiment():
    # Get the absolute path to the directory containing this script
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Use absolute paths relative to this base_dir
    data_dir = os.path.join(base_dir, "..", "data")
    os.makedirs(data_dir, exist_ok=True)

    processed_csv = os.path.join(data_dir, "processed_comments.csv")
    model_dir = os.path.join(base_dir, "..", "model")
    model_path = os.path.join(model_dir, "sentiment_model.pkl")
    vectorizer_path = os.path.join(model_dir, "tfidf_vectorizer.pkl")
    output_csv = os.path.join(data_dir, "analyzed_comments.csv")

    print("[INFO] Loading model and vectorizer...")
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    print("[INFO] Model and vectorizer loaded.")

    print("[INFO] Loading preprocessed comments...")
    df = pd.read_csv(processed_csv)
    df['processed_comment'] = df['processed_comment'].astype(str).fillna('')

    print("[INFO] Vectorizing comments...")
    X_vec = vectorizer.transform(df['processed_comment'])

    print("[INFO] Predicting sentiments...")
    sentiments = model.predict(X_vec)

    print("[INFO] Detecting sarcasm...")
    sarcasm_labels = []
    for text in df['processed_comment']:
        is_sarc = is_sarcastic(text)
        sarcasm_labels.append("Sarcastic" if is_sarc else "Not Sarcastic")

    df['analyzed_sentiment'] = sentiments
    df['sarcasm'] = sarcasm_labels

    df.to_csv(output_csv, index=False)
    print(f"[SUCCESS] Sentiment and sarcasm analysis saved to {output_csv}")

if __name__ == "__main__":
    analyze_sentiment()
