import cv2, dlib
import numpy as np
from imutils import face_utils
from keras.models import load_model

IMG_SIZE = (34, 26)

def crop_eye(img, eye_points):
    x1, y1 = np.amin(eye_points, axis=0)
    x2, y2 = np.amax(eye_points, axis=0)
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2

    w = (x2 - x1) * 1.2
    h = w * IMG_SIZE[1] / IMG_SIZE[0]

    margin_x, margin_y = w / 2, h / 2

    min_x, min_y = int(cx - margin_x), int(cy - margin_y)
    max_x, max_y = int(cx + margin_x), int(cy + margin_y)

    eye_rect = np.rint([min_x, min_y, max_x, max_y]).astype(np.int)

    eye_img = img[eye_rect[1]:eye_rect[3], eye_rect[0]:eye_rect[2]]

    return eye_img, eye_rect

def model():
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

    model1 = load_model('2021_03_11_16_08_58.h5')
    model2 = load_model("./keras_model.h5")


    # image 입력
    cap = cv2.VideoCapture("./images/3.jpg")

    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            break

        frame = cv2.resize(frame, dsize=(0, 0), fx=0.5, fy=0.5)

        img = frame.copy()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        if cv2.waitKey(1000) > 0: 
            break

        faces = detector(gray)

        if faces:
            for i,face in enumerate(faces):
                shapes = predictor(gray, face)
                shapes = face_utils.shape_to_np(shapes)

                eye_img_l, eye_rect_l = crop_eye(gray, eye_points=shapes[36:42])
                eye_img_r, eye_rect_r = crop_eye(gray, eye_points=shapes[42:48])

                eye_img_l = cv2.resize(eye_img_l, dsize=IMG_SIZE)
                eye_img_r = cv2.resize(eye_img_r, dsize=IMG_SIZE)
                eye_img_r = cv2.flip(eye_img_r, flipCode=1)

                eye_input_l = eye_img_l.copy().reshape((1, IMG_SIZE[1], IMG_SIZE[0], 1)).astype(np.float32) / 255.
                eye_input_r = eye_img_r.copy().reshape((1, IMG_SIZE[1], IMG_SIZE[0], 1)).astype(np.float32) / 255.

                pred_l = model1.predict(eye_input_l)
                pred_r = model1.predict(eye_input_r)

                # visualize
                state_l = 'O %.1f' if pred_l > 0.1 else '- %.1f'
                state_r = 'O %.1f' if pred_r > 0.1 else '- %.1f'

                state_l = state_l % pred_l
                state_r = state_r % pred_r

                print(f"{i+1}th left eye:", "close" if state_l[0]=="-" else "open")
                print(f"{i+1}th right eye:", "close" if state_r[0]=="-" else "open")
            
        else:
            print("cannot find eyes")

        frame_fliped = cv2.flip(frame, 1)
        size = (224, 224)
        frame_resized = cv2.resize(frame_fliped, size, interpolation=cv2.INTER_AREA)
        frame_normalized = (frame_resized.astype(np.float32) / 127.0) - 1
        preprocessed = frame_normalized.reshape((1, 224, 224, 3))

        prediction = model2.predict(preprocessed)
        
        if prediction[0,0] <= prediction[0,1]:
            print('딴짓')
                        
        else:
            print('집중 상태')

        cv2.imshow('result', img)
        if cv2.waitKey(1) == ord('q'):
            break

key = input()
if key == 'f':
    model()