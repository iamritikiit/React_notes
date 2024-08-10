from django.db import models
from nanoid import generate

def generate_id():
    return generate(size=21)  # Adjust size as needed

class Index(models.Model):
    id = models.CharField(primary_key=True, default=generate_id, editable=False, max_length=21)
    name = models.JSONField(default=list)  # Changed to JSONField to store a list of strings
    content = models.JSONField(default=list)  # Changed to JSONField to store a list of strings
    
    def __str__(self):
        return f"Post: {self.name}"
