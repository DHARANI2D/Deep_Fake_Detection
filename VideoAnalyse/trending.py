from flask import Flask, request, jsonify
import numpy as np
from classifiers import Meso4
from pipeline import compute_accuracy

app = Flask(__name__)

# Load the model
classifier = Meso4()
classifier.load('weights/Meso4_F2F.h5')

@app.route('/predict_deepfake', methods=['POST'])
def predict_deepfake():
    try:
        # Assuming the request contains a JSON payload with the video name
        video_name = request.json['video_name']
        
        # Perform prediction
        predictions = compute_accuracy(classifier, video_name)

        # Assuming 'fake' class probability is the first element of the prediction array
        is_deepfake = predictions[video_name][0] > 0.9  # Adjust the threshold as needed

        # Return the result
        return jsonify({'isDeepfake': is_deepfake})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '_main_':
    app.run(debug=True)