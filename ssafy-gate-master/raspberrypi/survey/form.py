from django import forms
from .models import Surveys

class Survey_Form(forms.ModelForm):
    #boolfield = forms.TypedChoiceField(coerce=lambda x: bool(int(x)),
    #                                   choices=((0,'False'),(1,'True')),
    #                                   widget=forms.RadioSelect
    #                                   )
        
    class Meta:
        model = Surveys
        fields = ['danger','body_check']
        #widgets = {'danger': forms.RadioSelect(choices=[
        #    (True, 'Yes'),
        #    (False, 'No')             
        #]),
        #           'body_check': forms.RadioSelect(choices=[
        #    (True, 'Sick'),
        #    (False, 'Ok')             
        #])}