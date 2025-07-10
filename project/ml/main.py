import os
import sys
import json

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
from utils.fetch_comments import fetch_comments
from utils.preprocess_comments import preprocess_comments
from utils.analyze_sentiment import analyze_sentiment
from utils.save_visualizations import save_visualizations
from visualize.visualize_sentiment import visualize_sentiment

def print_header():
    print("="*60)
    print("YouTube Comment Sentiment Analysis".center(60))
    print("="*60)

def prompt_save_choice():
    print("\n[INFO] What do you want to save?")
    print("1. Sentiment Distribution Chart")
    print("2. Sarcasm Distribution Chart")
    print("3. Word Cloud")
    print("4. All (Sentiment, Sarcasm, Word Cloud)")
    print("5. Exit without saving")
    choice = input("Enter your choice [1/2/3/4/5]: ").strip()
    return choice

def prompt_wordcloud_sentiment():
    print("\nWhich sentiment do you want to generate the word cloud for?")
    print("1. Positive")
    print("2. Negative")
    print("3. All")
    attempts = 0
    max_attempts = 3
    while attempts < max_attempts:
        choice = input("Enter your choice [1/2/3]: ").strip()
        if choice in ('1', '2', '3'):
            return choice
        print("[ERROR] Invalid choice. Please enter 1, 2, or 3")
        attempts += 1
    print("[INFO] Too many invalid attempts. Defaulting to '3' (All)")
    return "3"

def wordcloud_sentiment_from_number(choice_num):
    mapping = {
        '1': 'positive',
        '2': 'negative',
        '3': 'all'
    }
    return mapping.get(choice_num, 'all')

def main(video_url_or_id, save_choice=None, wordcloud_sentiment_num=None):
    print_header()

    print(f"\n[STEP 1] Fetching YouTube comments and metadata for: {video_url_or_id}")
    fetch_comments(video_url_or_id)

    print("\n[STEP 2] Preprocessing comments...")
    preprocess_comments()

    print("\n[STEP 3] Running sentiment analysis on comments...")
    analyze_sentiment()

    print("\n[STEP 4] Visualizing sentiment distribution and word cloud...")

    # wordcloud_sentiment_num should be string '1', '2', or '3'
    # if passed as descriptive string (like 'positive'), map back or change logic accordingly
    # Here we assume wordcloud_sentiment_num is either None or '1', '2', '3'
    
    visualize_sentiment(wordcloud_sentiment_num=wordcloud_sentiment_num)

    print("\n[STEP 5] Optional: Save sentiment chart and word cloud...")

    if save_choice is None:
        save_choice = prompt_save_choice()
    else:
        print(f"[INFO] Using save choice from argument: {save_choice}")

    if save_choice in ('3', '4') and not wordcloud_sentiment_num:
        wordcloud_sentiment_num = prompt_wordcloud_sentiment()
    elif wordcloud_sentiment_num:
        print(f"[INFO] Using wordcloud sentiment from argument: {wordcloud_sentiment_num}")

    save_visualizations(save_choice, wordcloud_sentiment_num)

    print("\n[INFO] Pipeline complete.")
    print("="*60)

    summary = {
        "video_url_or_id": video_url_or_id,
        "status": "success",
        "message": "Analysis completed successfully",
        "save_choice": save_choice,
        "wordcloud_sentiment_num": wordcloud_sentiment_num,
        "wordcloud_sentiment": wordcloud_sentiment_from_number(wordcloud_sentiment_num) if wordcloud_sentiment_num else None
    }
    print(json.dumps(summary))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "YouTube URL or video ID is required as a command-line argument"}))
        sys.exit(1)

    url_or_id = sys.argv[1]
    save_choice_arg = sys.argv[2] if len(sys.argv) > 2 else None
    wordcloud_sentiment_num_arg = sys.argv[3] if len(sys.argv) > 3 else None

    main(url_or_id, save_choice=save_choice_arg, wordcloud_sentiment_num=wordcloud_sentiment_num_arg)
