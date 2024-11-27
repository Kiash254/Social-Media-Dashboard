# dashboard/urls.py
from django.urls import path
from .views import social_media_account_list, social_media_account_detail, post_list, post_detail

urlpatterns = [
    path('accounts/', social_media_account_list),
    path('accounts/<int:pk>/', social_media_account_detail),
    path('posts/', post_list),
    path('posts/<int:pk>/', post_detail),
]