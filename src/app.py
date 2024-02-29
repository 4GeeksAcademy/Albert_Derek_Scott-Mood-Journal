"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, jsonify, send_from_directory, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api as api_blueprint
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

CORS(app)

# Environment configuration
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"

# Database configuration
db_url = os.getenv("DATABASE_URL", "sqlite:////tmp/test.db")
if db_url.startswith("postgres://"):  # Compatibility with newer SQLAlchemy versions
    db_url = db_url.replace("postgres://", "postgresql://")
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)
Migrate(app, db, compare_type=True)

# Setup admin and commands
setup_admin(app)
setup_commands(app)

# Register blueprints
app.register_blueprint(api_blueprint, url_prefix='/api')

# Error handling


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Sitemap and static file serving


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return app.send_static_file('index.html')


@app.route('/<path:path>', methods=['GET'])
def serve_static(path):
    return send_from_directory(app.static_folder, path)


# Main entry point
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=ENV == "development")
