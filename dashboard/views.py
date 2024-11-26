# dashboard/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import SocialMediaAccount, Post
from .serializers import SocialMediaAccountSerializer, PostSerializer

@api_view(['GET', 'POST'])
def social_media_account_list(request):
    if request.method == 'GET':
        accounts = SocialMediaAccount.objects.all()
        serializer = SocialMediaAccountSerializer(accounts, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = SocialMediaAccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)