from django.contrib import admin
from .models import *


class SlugifyAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ["name"]}

admin.site.register(Company,SlugifyAdmin)
admin.site.register(CompanyUser)
admin.site.register(StudentGroup,SlugifyAdmin)
admin.site.register(Student)
