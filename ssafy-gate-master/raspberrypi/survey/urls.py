from django.urls import path
from . import views

app_name='survey'

urlpatterns = [
    path('', views.notice, name='notice'),
    path('recognize/', views.recognize, name='recognize'),
    path('temperature/', views.temperature, name='temperature'),
    path('<int:student_id>/<str:temp>/survey/', views.survey, name='survey'),
    path('<int:student_id>/<str:temp>/submit/', views.submit, name='submit'),
    path('stream/',views.streaming, name='streaming'),
    path('recognize2/',views.recognize2, name='recognize2'),
    path('temperature2/',views.temperature2, name='temperature2')
]