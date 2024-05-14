from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import LoginForm, SignUpForm
from .models import Post

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
                return HttpResponse("<h1>LOGIN successful!</h1><p>Welcome to our platform.</p>")
                #return redirect('index')  # Change 'dashboard' to the name of your desired view
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
            login(request, user)
            return redirect('index')  # Redirect to the index page after signup
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})