import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users, Mood, JournalEntry   # Ensure model names are correct

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Mood Journal Admin', template_mode='bootstrap3')

       # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Users, db.session, name='Users'))
    admin.add_view(ModelView(Mood, db.session, name='Moods'))
    admin.add_view(ModelView(JournalEntry, db.session, name='Journal Entries'))
   #  admin.add_view(ModelView(Tag, db.session, name='Tags'))
   #  admin.add_view(ModelView(JournalEntriesTags, db.session, name='Journal Entries Tags'))

    

   

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))