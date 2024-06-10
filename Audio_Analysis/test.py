import os
import librosa
import librosa.display
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

def runtest(example_file_path):
    # Yüklenen modeli kullanma
    loaded_model = joblib.load("models/random_forest_model.joblib")

    def extract_features(file_path):
        try:
            audio, sample_rate = librosa.load(file_path, res_type='kaiser_fast')
            mfccs = np.mean(librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40).T, axis=0)
            return audio, mfccs, sample_rate
        except Exception as e:
            print("Error encountered while parsing file:", file_path)
            return None

    example_audio, example_features, sample_rate = extract_features(example_file_path)
    if example_features is not None:
        # Make a prediction
        prediction = loaded_model.predict([example_features])
        class_label = "Real" if prediction[0] == 1 else "Fake"
        print(f"{class_label} Audio File")

        # Plot the spectrogram as a line graph
        plt.figure(figsize=(15, 6))
        librosa.display.waveshow(example_audio, sr=sample_rate, alpha=0.5)
        plt.title('Spectrogram as Line Graph')
        plt.xlabel('Time (s)')
        plt.ylabel('Amplitude')
        plt.tight_layout()
        plt.show()
    else:
        print("Error extracting features from the example file.")

# Example usage:
example_file_path = "data/fake/LJ038-0119_gen.wav"
runtest(example_file_path)
