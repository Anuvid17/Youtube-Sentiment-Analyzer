# import shutil
# import os
# import tkinter as tk
# from tkinter import filedialog

# def ask_user_choice():
#     print("\n[INFO] What do you want to save?")
#     print("1. Sentiment Distribution Chart")
#     print("2. Word Cloud")
#     print("3. Both")
#     print("4. Exit without saving")

#     while True:
#         choice = input("Enter your choice [1/2/3/4]: ").strip()
#         if choice in {'1', '2', '3', '4'}:
#             return choice
#         else:
#             print("[ERROR] Invalid input. Please enter 1, 2, 3, or 4.")

# def save_file(src_filename, default_name):
#     src_path = os.path.join("outputs", src_filename)

#     if not os.path.exists(src_path):
#         print(f"[ERROR] File '{src_filename}' not found in outputs/. Please run the visualization script first.")
#         return

#     root = tk.Tk()
#     root.withdraw()  

#     save_path = filedialog.asksaveasfilename(
#         defaultextension=".png",
#         filetypes=[("PNG Image", "*.png")],
#         initialfile=default_name,
#         title="Save As"
#     )

#     if not save_path:
#         print("[INFO] Save cancelled.")
#         return

#     try:
#         shutil.copyfile(src_path, save_path)
#         print(f"[SUCCESS] File saved as: {save_path}")
#     except Exception as e:
#         print(f"[ERROR] Could not save file: {e}")

# def save_visualizations():
#     os.makedirs("outputs", exist_ok=True)
#     choice = ask_user_choice()

#     if choice == '1':  # Sentiment Chart
#         save_file("sentiment_distribution.png", "sentiment_distribution.png")
#     elif choice == '2':  # Word Cloud
#         available_clouds = [f for f in os.listdir("outputs") if f.startswith("wordcloud_") and f.endswith(".png")]
#         if not available_clouds:
#             print("[ERROR] No word clouds found. Please run the visualization script first.")
#             return

#         print("\nAvailable Word Clouds:")
#         for idx, file in enumerate(available_clouds, start=1):
#             print(f"{idx}. {file}")

#         try:
#             selected = int(input("Select the number of the word cloud you want to save: "))
#             if 1 <= selected <= len(available_clouds):
#                 save_file(available_clouds[selected - 1], available_clouds[selected - 1])
#             else:
#                 print("[ERROR] Invalid selection.")
#         except ValueError:
#             print("[ERROR] Please enter a valid number.")
#     elif choice == '3':  # Both
#         save_file("sentiment_distribution.png", "sentiment_distribution.png")
#         available_clouds = [f for f in os.listdir("outputs") if f.startswith("wordcloud_") and f.endswith(".png")]
#         if available_clouds:
#             save_file(available_clouds[0], available_clouds[0])
#         else:
#             print("[WARNING] No word cloud found to save.")
#     else:
#         print("[INFO] No files saved.")

# if __name__ == "__main__":
#     save_visualizations()

import shutil
import os
import tkinter as tk
from tkinter import filedialog

def ask_user_choice():
    print("\n[INFO] What do you want to save?")
    print("1. Sentiment Distribution Chart")
    print("2. Sarcasm Distribution Chart")
    print("3. Word Cloud")
    print("4. All (Sentiment, Sarcasm, Word Cloud)")
    print("5. Exit without saving")

    while True:
        choice = input("Enter your choice [1/2/3/4/5]: ").strip()
        if choice in {'1', '2', '3', '4', '5'}:
            return choice
        else:
            print("[ERROR] Invalid input. Please enter a number from 1 to 5.")

def save_file(src_filename, default_name):
    src_path = os.path.join("outputs", src_filename)

    if not os.path.exists(src_path):
        err_msg = f"[ERROR] File '{src_filename}' not found in outputs/. Please run the visualization script first."
        print(err_msg)
        return {"success": False, "file": src_filename, "error": err_msg}

    root = tk.Tk()
    root.withdraw()  # Hide the main tkinter window

    save_path = filedialog.asksaveasfilename(
        defaultextension=".png",
        filetypes=[("PNG Image", "*.png")],
        initialfile=default_name,
        title="Save As"
    )

    if not save_path:
        info_msg = "[INFO] Save cancelled."
        print(info_msg)
        return {"success": False, "file": src_filename, "info": info_msg}

    try:
        shutil.copyfile(src_path, save_path)
        success_msg = f"[SUCCESS] File saved as: {save_path}"
        print(success_msg)
        return {"success": True, "file": src_filename, "saved_as": save_path}
    except Exception as e:
        err_msg = f"[ERROR] Could not save file: {e}"
        print(err_msg)
        return {"success": False, "file": src_filename, "error": err_msg}

def save_wordcloud(choice=None):
    available_clouds = [f for f in os.listdir("outputs") if f.startswith("wordcloud_") and f.endswith(".png")]

    if not available_clouds:
        err_msg = "[ERROR] No word clouds found. Please run the visualization script first."
        print(err_msg)
        return {"success": False, "error": err_msg}

    if choice is None:
        print("\nAvailable Word Clouds:")
        for idx, file in enumerate(available_clouds, start=1):
            print(f"{idx}. {file}")

        try:
            selected = int(input("Select the number of the word cloud you want to save: "))
            if 1 <= selected <= len(available_clouds):
                return save_file(available_clouds[selected - 1], available_clouds[selected - 1])
            else:
                err_msg = "[ERROR] Invalid selection."
                print(err_msg)
                return {"success": False, "error": err_msg}
        except ValueError:
            err_msg = "[ERROR] Please enter a valid number."
            print(err_msg)
            return {"success": False, "error": err_msg}
    else:
        if isinstance(choice, int):
            idx = choice - 1
            if 0 <= idx < len(available_clouds):
                return save_file(available_clouds[idx], available_clouds[idx])
            else:
                err_msg = "[ERROR] Invalid word cloud choice index."
                print(err_msg)
                return {"success": False, "error": err_msg}
        elif isinstance(choice, str):
            if choice in available_clouds:
                return save_file(choice, choice)
            else:
                err_msg = "[ERROR] Word cloud filename not found."
                print(err_msg)
                return {"success": False, "error": err_msg}
        else:
            err_msg = "[ERROR] Invalid choice parameter."
            print(err_msg)
            return {"success": False, "error": err_msg}

def save_visualizations(choice=None, wordcloud_sentiment_num=None):
    """
    Saves visualizations based on choice:
    choice can be '1', '2', '3', '4', or '5' (as str or int)
    wordcloud_sentiment_num can be index (1-based) or filename
    """
    os.makedirs("outputs", exist_ok=True)

    if choice is None:
        choice = ask_user_choice()

    results = []

    if str(choice) == '1':
        results.append(save_file("sentiment_distribution.png", "sentiment_distribution.png"))

    elif str(choice) == '2':
        results.append(save_file("sarcasm_distribution.png", "sarcasm_distribution.png"))

    elif str(choice) == '3':
        results.append(save_wordcloud(wordcloud_sentiment_num))

    elif str(choice) == '4':
        results.append(save_file("sentiment_distribution.png", "sentiment_distribution.png"))
        results.append(save_file("sarcasm_distribution.png", "sarcasm_distribution.png"))

        # Save specific or first available wordcloud
        results.append(save_wordcloud(wordcloud_sentiment_num))

    elif str(choice) == '5':
        info_msg = "[INFO] No files saved."
        print(info_msg)
        results.append({"success": False, "info": info_msg})

    else:
        err_msg = "[ERROR] Invalid choice provided."
        print(err_msg)
        results.append({"success": False, "error": err_msg})

    return results


if __name__ == "__main__":
    save_visualizations()
