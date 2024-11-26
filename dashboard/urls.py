# dashboard/urls.py
from django.urls import path
from .views import social_media_account_list, post_list

urlpatterns = [
    path('accounts/', social_media_account_list),
    path('posts/', post_list),
]