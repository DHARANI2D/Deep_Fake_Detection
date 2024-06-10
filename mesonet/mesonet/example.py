from flask import Flask, request, jsonify
from classifiers import *
from pipeline import *
from tensorflow.keras.preprocessing.image import ImageDataGenerator

app = Flask(__name__)

classifier = Meso4()
classifier.load('weights/Meso4_F2F.h5')

@app.route('/analyze', methods=['GET'])
def analyze_deepfake():
    try:
        predictions = compute_accuracy(classifier, 'testt')
        her = ""
        for video_l in predictions:
            fake_confidence = predictions[video_l][0]
            if fake_confidence < 0.8:
                her="real"
            elif fake_confidence ==1.0:
                her ="real"
            else:
                her="fake"
        data={
             "value":her
        }
        print(her)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    # Run the app on port 5001
    app.run(debug=True, port=5001)
