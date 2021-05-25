from django.urls import path
from . import views

urlpatterns = [
    path('active/timeline/<int:user_pk>/', views.get_my_timelines),
    path('active/<int:active_pk>/', views.get_active_info),
    path('active/detail/<int:active_pk>/', views.get_active_detail_info),
    path('active/start/', views.start_active),
    path('active/end/', views.end_active),
    path('active/image/', views.send_image),
    path('active/pause/start/', views.start_rest),
    path('active/pause/end/', views.end_rest),
    path('active/analysis/<int:active_pk>/', views.get_active),
    path('active/analysis/my/<int:user_pk>/', views.get_my_active),
    path('active/analysis/group/<int:group_pk>/', views.get_average_active_of_group),
]