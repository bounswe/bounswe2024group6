from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import LoginForm, SignUpForm
from .models import Post, UserProfile
from django.contrib.auth.models import User


def index(request):
    latest_posts = Post.objects.order_by('-created_at')[:5]  # Fetch the 5 most recent posts

    return render(request, 'index.html', {'latest_posts': latest_posts})


def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('user_homepage', username=user.username)
            else:
                return render(request, 'login.html', {'form': form, 'error_message': 'Invalid username or password'})
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            UserProfile.objects.create(user=user)
            login(request, user)

            return redirect('index')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

def user_homepage(request, username):
    # Retrieve the user based on the provided username
    user = User.objects.get(username=username)
    # Assuming you have a UserProfile model associated with each user
    profile = UserProfile.objects.get(user=user)
    # Render the user's homepage
    return render(request, 'user_homepage.html', {'profile': profile})