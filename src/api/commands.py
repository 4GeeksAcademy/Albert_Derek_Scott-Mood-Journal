
import click
import json
from api.models import db, Users, Mood


"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            users = Users()
            users.email = "test_users" + str(x) + "@test.com"
            users.password = "123456"
            users.is_active = True
            db.session.add(users)
            db.session.commit()
            print("User: ", users.email, " created.")

        print("All test users created")


    @app.cli.command("import-moods")
    @click.argument('file_path')  # Valid argument name
    def import_moods(file_path):
        """Import moods from a JSON file."""
        with open(file_path, 'rt') as json_file:
            moods_data = json.load(json_file)
        
        moods = []
        for mood_data in moods_data:
            mood = Mood(**mood_data)  # Create a Mood instance for each record
            moods.append(mood)
        
        with app.app_context():
            db.session.add_all(moods)  # Add all Mood instances to the session
            db.session.commit()  # Commit the session to save changes to the database
            print(f"{len(moods)} moods imported successfully.")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass