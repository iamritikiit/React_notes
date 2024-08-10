from rest_framework import serializers
from ..models import Index

class IndexSerializer(serializers.ModelSerializer):
    class Meta:
        model = Index
        fields = ('id', 'name', 'content')

class CreateIndexSerializer(serializers.ModelSerializer):
    name = serializers.ListField(child=serializers.CharField(), default=list)
    content = serializers.ListField(child=serializers.CharField(), default=list)

    class Meta:
        model = Index
        fields = ('id', 'name', 'content')

    def validate(self, data):
        # Ensure that 'name' and 'content' are lists
        if isinstance(data.get('name'), str):
            data['name'] = [data['name']]
        if isinstance(data.get('content'), str):
            data['content'] = [data['content']]
        return data

    def create(self, validated_data):
        # Flatten the list fields to strings for saving to the database if necessary
        validated_data['name'] = ' '.join(validated_data['name'])
        validated_data['content'] = ' '.join(validated_data['content'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Flatten the list fields to strings for saving to the database if necessary
        instance.name = ' '.join(validated_data.get('name', instance.name))
        instance.content = ' '.join(validated_data.get('content', instance.content))
        return super().update(instance, validated_data)
