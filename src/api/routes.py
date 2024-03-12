"""
Improved Flask API module with corrections and enhancements.
"""
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from api.models import db, Users, JournalEntry, Mood
from flask_cors import CORS
import hashlib
# from api.exceptions import APIException

api = Blueprint('api', __name__)
CORS(api)


@api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data or 'full_name' not in data:
        return jsonify({'message': 'Missing email, password, or full name'}), 400

    if Users.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = Users(email=data['email'], password_hash=hashed_password, full_name=data['full_name'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Registered successfully'}), 201


@api.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Could not verify', 'WWW-Authenticate': 'Basic realm="Login required!"'}), 401

    user = Users.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(
            identity=user.id, expires_delta=timedelta(hours=24))
        return jsonify({'message': 'Login successful', 'token': access_token}), 200

    return jsonify({'message': 'Could not verify', 'WWW-Authenticate': 'Basic realm="Login required!"'}), 401


@api.route('/journal', methods=['POST'])
@jwt_required()
def add_journal_entry():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    if not data or not data.get('content') or not data.get('mood_id'):
        return jsonify({'message': 'Missing journal entry data'}), 400

    new_entry = JournalEntry(user_id=current_user_id,
                             content=data['content'], mood_id=data['mood_id'])
    db.session.add(new_entry)
    db.session.commit()

    return jsonify({'message': 'Journal entry created successfully'}), 201


@api.route('/journal/<int:user_id>', methods=['GET'])
@jwt_required()
def get_journal_entries(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({'message': 'Unauthorized'}), 403

    entries = JournalEntry.query.filter_by(user_id=user_id).all()
    output = [entry.serialize() for entry in entries]

    return jsonify({'journal_entries': output})


@api.route('/moods', methods=['GET'])
def get_moods():
    all_moods = Mood.query.all()
    output = [mood.serialize() for mood in all_moods]

    return jsonify({'moods': output})


@api.route('/hello', methods=['GET'])
@jwt_required()
def handle_hello():
    current_user = get_jwt_identity()
    return jsonify({'message': "Hello! I'm a message from the backend", 'logged_in_as': current_user}), 200

# Removed duplicate and conflicting endpoints for user creation and login.
# Ensure all endpoints use consistent error handling and response formatting.


@api.route('/user/<int:id>', methods=["GET"])
def get_user(id):
    user = Users.query.get(id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user.serialize()), 200


@api.route('/user', methods=["GET"])
def get_all_users():
    users = Users.query.all()
    all_users = [user.serialize() for user in users]
    return jsonify(all_users), 200


@api.route('/user/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user_id = get_jwt_identity()
    user = Users.query.get(current_user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({"message": "Here's your user information", "user":user.serialize()}), 200


@api.route('/user/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    current_user_id = get_jwt_identity()
    if current_user_id != id:
        return jsonify({'message': 'Unauthorized'}), 403

    user = Users.query.get(id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    data = request.get_json()
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.password_hash = generate_password_hash(
            data['password'], method='pbkdf2:sha256')

    db.session.commit()
    return jsonify(user.serialize()), 200


@api.route('/user/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    current_user_id = get_jwt_identity()
    if current_user_id != id:
        return jsonify({'message': 'Unauthorized'}), 403

    user = Users.query.get(id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def get_private():
    return jsonify({'message': 'This is a private endpoint. You need to be logged in to see it'}), 200


@api.route('/updateProfile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    user = Users.query.get(current_user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404  
    data = request.get_json()  
    response_body = {"full_name_message":"","email_message":"", "password_message":""}
    if 'fullName' in data and data["fullName"] != user.full_name:
        user.full_name = data['fullName']
        response_body['full_name_message']= 'Name successfully changed'
    else:
        response_body['email_message']= 'fullName field not sent'
    if Users.query.filter_by(email=data['email']).first():
           response_body['email_message']= 'Email already in use'
    elif 'email' in data:
        user.email = data['email']
        response_body['email_message']= 'email successfully changed'
    else:
        response_body['email_message']= 'email field not sent'
    if 'newPassword' in data and user.password_hash != generate_password_hash(data['newPassword'], method='pbkdf2:sha256') :
        user.password_hash = generate_password_hash(data['newPassword'], method='pbkdf2:sha256') 
        response_body['password_message']= 'password successfully changed'
    else: 
        response_body['password_message']= 'no password changes'
        
    if 'avatar' in data and data["avatar"] != user.full_name:
        user.avatar = data['avatar']
        response_body['avatar_message']= 'Name successfully changed'
    else:
        response_body['email_message']= 'fullName field not sent'
    db.session.commit()
    return jsonify(response_body), 200








