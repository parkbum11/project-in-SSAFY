from django.shortcuts import render, redirect
from .models import Articles, Students, ProSurveys
from .form import Survey_Form
import cv2
import os
import numpy as np
import threading
from django.http import StreamingHttpResponse
import requests
from django.http import JsonResponse
import serial

#arduino

#opencv
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('survey/trainer/trainer.yml')
cascadePath = 'survey/haarcascades/haarcascade_frontalface_default.xml'
faceCascade = cv2.CascadeClassifier(cascadePath);
font = cv2.FONT_HERSHEY_SIMPLEX

id = 0
cnt = 0
student = [0,0]
#names related to ids: example ==> Marcelo: id=1,  etc
names = ['None','kyungseok','moonseok','kyungsoo','hakjun','seunghyuk','dongwook']

class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.video.set(3, 640) # set video widht
        self.video.set(4, 480)
        (self.grabbed, self.frame) = self.video.read()
        threading.Thread(target=self.update, args=()).start()

    def __del__(self):
        self.video.release()

    def get_frame(self):
        global names
        image = self.frame
        gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
        faces = faceCascade.detectMultiScale( 
            gray,
            scaleFactor = 1.2,
            minNeighbors = 5,
            #minSize = (int(minW), int(minH)),
            )
        for(x,y,w,h) in faces:
            name = ''
            cv2.rectangle(image, (x,y), (x+w,y+h), (0,255,0), 2)
            id, confidence = recognizer.predict(gray[y:y+h,x:x+w])
            # Check if confidence is less them 100 ==> "0" is perfect match 
            if (confidence < 100):
                name = names[id]
                confidence =(round(100 - confidence))
                if confidence > student[1]:
                    student[0] = id
                    student[1] = confidence
            #print(student)
            cv2.putText(image, str(name), (x+5,y-5), font, 1, (255,255,255), 2)
            #print(cnt,student)
            #if cnt > 10:
            #    return student
            
            # else:
            #     id = "unknown"
            #     confidence = "  {0}%".format(round(100 - confidence))
    
            # cv2.putText(image, str(id), (x+5,y-5), font, 1, (255,255,255), 2)
            # cv2.putText(image, str(confidence), (x+5,y+h-5), font, 1, (255,255,0), 1)


        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()


cam = VideoCamera()


def gen(camera):
    while True:
        frame = cam.get_frame()
        yield(b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


#@gzip.gzip_page
def streaming(request):
    try:
        #print(type(gen(VideoCamera())))
        return StreamingHttpResponse(gen(VideoCamera()), content_type="multipart/x-mixed-replace;boundary=frame")
    except:  # This is bad! replace it with proper handling
        print('errer')


# Create your views here.
def notice(request):
    global cnt
    global student
    student = [0,0]
    articles = Articles.objects.filter(pro_id=1)[:2]
    # for recognize chogihwa

    cnt = 0
    
    context = {
        'articles':articles
        }
    return render(request,'survey/notice.html',context)

def recognize(request):
    
    return render(request,'survey/recognize.html')

def recognize2(request):
    global student
    context = {
        'student_id':student[0],
        'confidence':student[1]
        }
    return JsonResponse(context)
            
        

def temperature(request):
    global student
    if student[0] == 0:
        return redirect('survey:notice')
    student = Students.objects.get(id=student[0])
    context = {
        'student':student
        }
    return render(request, 'survey/temperature.html',context)

def temperature2(request):
    global cnt
    ser = serial.Serial('/dev/ttyACM0',9600)
    temp = str(ser.readline())
    if int(temp[2]) != 0:
        cnt += 1
        context = {
            'temp':float(temp[2:7]),
            'cnt':cnt
            }
    else:
        cnt = 0
        context = {
            'temp':int(temp[2]),
            'cnt':cnt
            }
    return JsonResponse(context)

def survey(request,student_id,temp):
    student = Students.objects.get(id=student_id)
    question_body = ProSurveys.objects.filter(checked=0)
    question_danger = ProSurveys.objects.filter(checked=1)
    if float(temp) > 37.5:
        return render(request,'survey/warning.html')
    else:
        temperature = temp
        form = Survey_Form()
        context = {
            'student':student,
            'temperature':temperature,
            'form':form,
            'question_body':question_body,
            'question_danger':question_danger,
            }
        return render(request, 'survey/survey.html',context)


def submit(request,student_id,temp):
    if request.method == 'POST':
        form = Survey_Form(request.POST)
        if form.is_valid():
            survey = form.save(commit=False)
            survey.student_id = student_id
            survey.body_temperature = float(temp)
            survey.save()
    return redirect('survey:notice')
    #mariadb save