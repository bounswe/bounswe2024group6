from rest_framework import serializers

class ExampleSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)
