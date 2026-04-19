# pipeline.py

import os
import requests
import yaml
from django.contrib.auth.models import User
from social_core.exceptions import AuthException
from django.conf import settings

def create_user(backend, user, response, *args, **kwargs):
    # Get the profile picture URL
    print(f"create_user: user = {user}")
    profile_picture_url = response.get('picture')
    if profile_picture_url:
        save_profile_picture_to_yaml(user, profile_picture_url)

    if backend.name == 'google-oauth2':
        # Check if the user already exists by email
        if not User.objects.filter(email=response.get('email')).exists():
            # Create a new user with details from Google
            username = response.get('name').replace(" ", "_")  # Replace spaces with underscores for username
            email = response.get('email')
            first_name = response.get('given_name', '')
            last_name = response.get('family_name', '')

            try:
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                )
                user.save()


            except Exception as e:
                raise AuthException(f"Error creating user: {str(e)}")

def save_profile_picture_to_yaml(username, profile_picture_url):
    # Define the path for the data directory and YAML file
    data_dir = settings.DATA_DIR
    yaml_file_path = os.path.join(data_dir, 'profile_pictures.yaml')
    # open the YAML file with yaml.safe_load
    # read the yaml file with yaml.safe_load
    data = {}
    if os.path.exists(yaml_file_path):
        with open(yaml_file_path, 'r') as file:
            data = yaml.safe_load(file)
    if not data:
        data = {}
    data[str(username)] = profile_picture_url
    with open(yaml_file_path, 'w') as file:
        yaml.dump(data, file)
    print(f"save_profile_picture_to_yaml: data = {data}")
    print(f"Profile picture URL saved to {yaml_file_path} for user: {username}, url: {profile_picture_url}")