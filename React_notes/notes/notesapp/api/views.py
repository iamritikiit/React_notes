from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from ..models import Index
from .serializers import IndexSerializer, CreateIndexSerializer

class IndexViewSet(viewsets.ModelViewSet):
    queryset = Index.objects.all()
    serializer_class = IndexSerializer

    @action(detail=True, methods=['post'])
    def custom_action(self, request, pk=None):
        # Example custom action (not really necessary unless you have specific logic)
        return Response({'status': 'custom action executed'})

class CreateIndexView(APIView):
    serializer_class = CreateIndexSerializer
    
    def post(self, request, format=None):
        # Instantiate the serializer with the request data
        serializer = self.serializer_class(data=request.data)

        # Validate and save the serializer data
        if serializer.is_valid():
            serializer.save()  # Save the new Index instance
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return validation errors if the data is not valid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
