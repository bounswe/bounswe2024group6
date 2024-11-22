from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_following', 'get_followers')

    # Custom method to display users this profile is following
    def get_following(self, obj):
        return ", ".join([str(profile.user.username) for profile in obj.following.all()])
    get_following.short_description = 'Following'

    # Custom method to display users following this profile
    def get_followers(self, obj):
        return ", ".join([str(profile.user.username) for profile in obj.followers.all()])
    get_followers.short_description = 'Followers'
