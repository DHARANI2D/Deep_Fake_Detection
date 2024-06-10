# from flask import Flask, request, jsonify
# from pytube import YouTube
# from flask_cors import CORS 
# import os

# app = Flask(__name__)
# CORS(app)

# @app.route('/download-youtube-video', methods=['POST'])
# def delete_all_files(folder_path):
#     try:
#         # Get a list of all files in the folder
#         files = glob.glob(os.path.join(folder_path, '*'))

#         # Delete each file
#         for file in files:
#             os.remove(file)

#         print(f"All files in {folder_path} deleted successfully.")
#     except Exception as e:
#         print(f"Error: {e}")
# def download_youtube_video():
#     try:
#         data = request.get_json()
#         youtube_url = data['youtube_url']

#         yt = YouTube(youtube_url)
#         video = yt.streams.get_highest_resolution()

#         download_path1 = r"C:\Users\JAHAN SAI\Desktop\deepfakerajpol\public"
#         download_path2=r"C:\Users\JAHAN SAI\Desktop\mesonet\testt"
#         video.download(download_path1)
#         video.download(download_path2)

#         # Get the filename of the downloaded video
#         file_name = video.title + "." + video.subtype

#         # Create the full file path
#         file_path = os.path.join(download_path2, file_name)
#         return jsonify({'success': True, 'message': 'Download completed successfully', 'file_name':file_name,'actual_path':file_path })
#     except Exception as e:
#         return jsonify({'success': False, 'message': str(e)})

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
from pytube import YouTube
from flask_cors import CORS 
import os
import glob

app = Flask(__name__)
CORS(app)

def delete_all_files(folder_path):
    try:
        # Get a list of all files in the folder
        files = glob.glob(os.path.join(folder_path, '*'))

        # Delete each file
        for file in files:
            os.remove(file)

        print(f"All files in {folder_path} deleted successfully.")
    except Exception as e:
        print(f"Error: {e}")

@app.route('/download-youtube-video', methods=['POST'])
def download_youtube_video():
    try:
        data = request.get_json()
        youtube_url = data['youtube_url']

        yt = YouTube(youtube_url)
        video = yt.streams.get_highest_resolution()

        download_path1 = r"C:\Users\JAHAN SAI\Desktop\deepfakerajpol\public"
        download_path2 = r"C:\Users\JAHAN SAI\Desktop\mesonet\testt"

        # Delete all files in download_path2 before saving the new file
        delete_all_files(download_path2)
        video.download(download_path2)
        video.download(download_path1)

        # Get the filename of the downloaded video
        file_name = video.title + "." + video.subtype

        # Create the full file path
        file_path = os.path.join(download_path2, file_name)
        return jsonify({'success': True, 'message': 'Download completed successfully', 'file_name': file_name, 'actual_path': file_path })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
