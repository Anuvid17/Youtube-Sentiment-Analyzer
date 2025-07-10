import os
import pandas as pd
import re
import nltk
from langdetect import detect, DetectorFactory

DetectorFactory.seed = 0

# Get base directory relative to this script file
base_dir = os.path.dirname(os.path.abspath(__file__))

input_csv = os.path.join(base_dir, "..", "data", "raw_comments.csv")
output_csv = os.path.join(base_dir, "..", "data", "processed_comments.csv")

def preprocess_text(text):
    if not isinstance(text, str):
        return ''
    
    try:
        if detect(text) != 'en':
            return ''
    except Exception:
        return ''
    
    # Clean text
    text = re.sub(r"http\S+|www\S+|https\S+", "", text)
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    text = re.sub(r'\s+[a-zA-Z]\s+', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    text = text.lower()
    
    return text

def preprocess_comments(input_path=input_csv, output_path=output_csv):
    print(f"[INFO] Looking for input file at: {input_path}")
    if not os.path.exists(input_path):
        print("[ERROR] 'raw_comments.csv' not found in the data directory.")
        return False

    print("[INFO] Reading input CSV...")
    df = pd.read_csv(input_path)
    df['comment'] = df['comment'].fillna('')
    print(f"[INFO] Preprocessing {len(df)} comments...")

    df['processed_comment'] = df['comment'].apply(preprocess_text)
    df = df[df['processed_comment'] != '']

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df.to_csv(output_path, index=False)

    print(f"[SUCCESS] Preprocessing complete. Saved {len(df)} processed comments to {output_path}")
    return True

if __name__ == "__main__":
    preprocess_comments()
