import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import os
import json
from datetime import datetime

# Get base directory relative to this script file
base_dir = os.path.dirname(os.path.abspath(__file__))

def load_video_context(context_path=None):
    if context_path is None:
        context_path = os.path.join(base_dir, "..", "data", "raw_context.json")
    generated_on = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # current timestamp

    if os.path.exists(context_path):
        with open(context_path, "r") as f:
            context = json.load(f)
        video_title = context.get("title", "Unknown Title")
        video_date = context.get("published_at", "")[:10]  # Only date part
        video_label = f"{video_title} ({video_date})"
    else:
        video_label = "Unknown Video"
        video_date = "unknown publishing date"

    return video_label, generated_on

def plot_sentiment_distribution(df, video_label, generated_on):
    output_dir = os.path.join(base_dir, "..", "outputs")
    os.makedirs(output_dir, exist_ok=True)

    print("[INFO] Plotting sentiment distribution...")
    sentiment_counts = df['analyzed_sentiment'].value_counts()

    plt.figure(figsize=(6, 4))
    sentiment_counts.plot(kind='bar', color=['green', 'blue', 'red'])
    plt.title(f"Sentiment Distribution\n{video_label}\nGenerated on: {generated_on}", fontsize=10)
    plt.xlabel("Sentiment")
    plt.ylabel("Number of Comments")
    plt.xticks(rotation=0)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, "sentiment_distribution.png"))
    plt.show()
    print(f"[SUCCESS] Sentiment bar chart saved to {os.path.join(output_dir, 'sentiment_distribution.png')}")

def plot_sarcasm_distribution(df, video_label, generated_on):
    output_dir = os.path.join(base_dir, "..", "outputs")
    os.makedirs(output_dir, exist_ok=True)

    if 'sarcasm' not in df.columns:
        print("[WARNING] No 'sarcasm' column found. Skipping sarcasm chart.")
        return

    print("[INFO] Plotting sarcasm distribution (donut chart)...")
    sarcasm_counts = df['sarcasm'].value_counts()

    plt.figure(figsize=(5, 5))
    colors = ['purple', 'gray']
    labels = sarcasm_counts.index.astype(str)
    wedges, texts, autotexts = plt.pie(
        sarcasm_counts,
        labels=labels,
        colors=colors,
        autopct='%1.1f%%',
        startangle=140,
        wedgeprops=dict(width=0.4)  # This makes it a donut
    )

    plt.text(0, 0, "Sarcasm", ha='center', va='center', fontsize=10)
    plt.title(f"Sarcasm Distribution\n{video_label}\nGenerated on: {generated_on}", fontsize=10)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, "sarcasm_distribution.png"))
    plt.show()
    print(f"[SUCCESS] Sarcasm donut chart saved to {os.path.join(output_dir, 'sarcasm_distribution.png')}")

def generate_wordcloud(df, video_label, generated_on, sentiment_choice=None):
    output_dir = os.path.join(base_dir, "..", "outputs")
    os.makedirs(output_dir, exist_ok=True)
    print("[INFO] Generating word cloud...")

    valid_choices = ['positive', 'negative', 'all']

    if sentiment_choice is None:
        # Interactive prompt fallback
        max_attempts = 3
        attempts = 0
        while attempts < max_attempts:
            sentiment_choice = input("\nWhich sentiment do you want to generate a word cloud for? [positive/negative/all]: ").strip().lower()
            if sentiment_choice in valid_choices:
                break
            print("[ERROR] Invalid choice. Please enter: positive / negative / all")
            attempts += 1

        if sentiment_choice not in valid_choices:
            print("[INFO] Too many invalid attempts. Defaulting to 'all'")
            sentiment_choice = "all"
    else:
        # Map numeric input to string sentiment
        mapping = {
            '1': 'positive',
            '2': 'negative',
            '3': 'all',
            1: 'positive',
            2: 'negative',
            3: 'all'
        }
        sentiment_choice = mapping.get(str(sentiment_choice).lower(), 'all')

    if sentiment_choice == 'all':
        text = ' '.join(df['comment'])
        filename = os.path.join(output_dir, "wordcloud_all.png")
    else:
        filtered_df = df[df['analyzed_sentiment'].str.lower() == sentiment_choice]
        if filtered_df.empty:
            print(f"[ERROR] No comments found for sentiment: {sentiment_choice}")
            return
        text = ' '.join(filtered_df['comment'])
        filename = os.path.join(output_dir, f"wordcloud_{sentiment_choice}.png")

    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(text)
    plt.figure(figsize=(10, 5))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.title(f"Word Cloud - {sentiment_choice.capitalize()}\n{video_label}\nGenerated on: {generated_on}", fontsize=10)
    plt.axis("off")
    plt.tight_layout()
    plt.savefig(filename)
    plt.show()
    print(f"[SUCCESS] Word Cloud saved as {filename}")
    plt.close()

def visualize_sentiment(input_csv=None, context_path=None, wordcloud_sentiment_num=None):
    if input_csv is None:
        input_csv = os.path.join(base_dir, "..", "data", "analyzed_comments.csv")

    print(f"[INFO] Loading analyzed comments from {input_csv}...")
    df = pd.read_csv(input_csv)
    video_label, generated_on = load_video_context(context_path)

    plot_sentiment_distribution(df, video_label, generated_on)
    plot_sarcasm_distribution(df, video_label, generated_on)
    generate_wordcloud(df, video_label, generated_on, sentiment_choice=wordcloud_sentiment_num)

if __name__ == "__main__":
    visualize_sentiment()
