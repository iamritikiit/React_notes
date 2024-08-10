from django.urls import path, include
from rest_framework.routers import DefaultRouter
from notesapp.api.views import IndexViewSet, CreateIndexView
router = DefaultRouter()
router.register(r'index', IndexViewSet)

urlpatterns = [
    path('api/', include(router.urls)),  # For CRUD operations via viewsets
    path('api/create-index/', CreateIndexView.as_view(), name='create-index'),  # For custom POST request
]
