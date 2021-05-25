import cv2
import tensorflow.keras
import numpy as np

model = tensorflow.keras.models.load_model("./keras_model.h5")

capture = cv2.VideoCapture("./images/9.jpg")

while capture.isOpened():
    ret, frame = capture.read()
    if not ret:break

    frame = cv2.resize(frame, dsize=(0,0), fx=0.5, fy=0.5)

    frame_fliped = cv2.flip(frame, 1)
    cv2.imshow("VideoFrame", frame_fliped)
    if cv2.waitKey(200) > 0: 
        break
    
    size = (224, 224)
    frame_resized = cv2.resize(frame_fliped, size, interpolation=cv2.INTER_AREA)
    frame_normalized = (frame_resized.astype(np.float32) / 127.0) - 1
    preprocessed = frame_normalized.reshape((1, 224, 224, 3))

    prediction = model.predict(preprocessed)
    
    if prediction[0,0] <= prediction[0,1]:
        print('딴짓')
                   
    else:
        print('집중 상태')
    
    if cv2.waitKey(1) == ord('q'):break
    
capture.release() 
cv2.destroyAllWindows()