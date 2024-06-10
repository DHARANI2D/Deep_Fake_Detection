import cv2
import warnings

def detect_faces(image):
    # Use Haar Cascade Classifier for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    
    # Convert the faces to the format used by MTCNN for consistency
    detected_faces = [{'box': (x, y, w, h)} for (x, y, w, h) in faces]
    
    return detected_faces

def create_video_display(video_path, output_fps_factor=2, frame_skip=1):
    # Suppress TensorFlow deprecation warnings
    warnings.filterwarnings("ignore", category=DeprecationWarning)

    cap = cv2.VideoCapture(video_path)
    original_fps = cap.get(cv2.CAP_PROP_FPS)
    output_fps = original_fps * output_fps_factor
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Skip frames based on frame_skip parameter
        if int(cap.get(cv2.CAP_PROP_POS_FRAMES)) % frame_skip != 0:
            continue

        faces = detect_faces(frame)

        for face in faces:
            x, y, w, h = face['box']
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)  # Draw green rectangle around face

        cv2.imshow('Video with Face Detection', frame)

        if cv2.waitKey(1) & 0xFF == 27:  # Press 'Esc' to exit
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    video_path = 'rty.mp4'
    create_video_display(video_path, output_fps_factor=2, frame_skip=2)
