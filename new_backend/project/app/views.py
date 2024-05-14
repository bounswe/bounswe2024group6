from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import LoginForm


from django.shortcuts import render
from .models import Post

def main_page(request):
    # Retrieve the latest blog posts
    latest_posts = Post.objects.order_by('-created_at')[:5]  # Fetch the 5 most recent posts

    # Pass the latest posts to the template for rendering
    return render(request, 'main.html', {'latest_posts': latest_posts})


def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                # Redirect to a success page, or a specific URL
                return redirect('dashboard')  # Change 'dashboard' to the name of your desired view
            else:
                # Return an 'invalid login' error message
                return render(request, 'login.html', {'form': form, 'error_message': 'Invalid username or password'})
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})
 