import os
import json
import pandas as pd
from googleapiclient.discovery import build
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
DATA_FOLDER = "data"
CSV_PATH = os.path.join(DATA_FOLDER, "raw_comments.csv")
JSON_PATH = os.path.join(DATA_FOLDER, "raw_context.json")


def extract_video_id(video_url):
    if "v=" in video_url:
        video_id = video_url.split("v=")[1].split("&")[0]
        return video_id
    else:
        raise ValueError("Invalid YouTube video URL. URL must contain 'v=' parameter.")


def get_metadata(api_key, video_id):
    try:
        youtube = build('youtube', 'v3', developerKey=api_key)
        request = youtube.videos().list(part='snippet', id=video_id)
        response = request.execute()

        if not response['items']:
            print("[WARNING] No metadata found for this video.")
            return None

        snippet = response['items'][0]['snippet']
        metadata = {
            "video_id": video_id,
            "title": snippet.get('title', ''),
            "channel_title": snippet.get('channelTitle', ''),
            "published_at": snippet.get('publishedAt', '')
        }
        return metadata

    except Exception as e:
        print(f"[ERROR] Failed to fetch metadata: {e}")
        return None


def get_comments(api_key, video_id, max_comments=100):
    try:
        youtube = build('youtube', 'v3', developerKey=api_key)
        comments = []
        next_page_token = None

        while True:
            request = youtube.commentThreads().list(
                part='snippet',
                videoId=video_id,
                maxResults=100,
                pageToken=next_page_token,
                textFormat='plainText'
            )
            response = request.execute()

            items = response.get('items', [])
            print(f"[DEBUG] Fetched {len(items)} items from API.")

            for item in items:
                comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
                comments.append({
                    "video_id": video_id,
                    "comment": comment
                })

                if len(comments) >= max_comments:
                    print("[INFO] Reached max_comments limit.")
                    break

            if len(comments) >= max_comments or 'nextPageToken' not in response:
                break

            next_page_token = response['nextPageToken']

        print(f"[INFO] Total comments fetched: {len(comments)}")
        return comments

    except Exception as e:
        print(f"[ERROR] Failed to fetch comments: {e}")
        return []


def fetch_comments(video_url_or_id, max_comments=1000):
    if not API_KEY:
        raise ValueError("API_KEY not found in environment variables")

    if video_url_or_id.startswith("http"):
        video_id = extract_video_id(video_url_or_id)
        print(f"[INFO] Extracted video ID: {video_id}")
    else:
        video_id = video_url_or_id

    os.makedirs(DATA_FOLDER, exist_ok=True)

    print(f"[INFO] Fetching metadata for video ID: {video_id}")
    metadata = get_metadata(API_KEY, video_id)

    if metadata:
        with open(JSON_PATH, "w") as f:
            json.dump(metadata, f, indent=2)
        print(f"[SUCCESS] Metadata saved to {JSON_PATH}")
    else:
        print("[WARNING] No metadata found; skipping JSON save.")

    print(f"[INFO] Fetching comments for video ID: {video_id}")
    comments = get_comments(API_KEY, video_id, max_comments)

    if comments:
        df = pd.DataFrame(comments)
        df.to_csv(CSV_PATH, index=False)
        print(f"[SUCCESS] Fetched {len(comments)} comments. Saved to {CSV_PATH}")
    else:
        print("[WARNING] No comments found. CSV not written.")
        df = pd.DataFrame()

    return metadata, df


# Optional: run as script
# if __name__ == "__main__":
#     video_url = input("Enter YouTube video URL or ID: ").strip()
#     fetch_comments(video_url)
