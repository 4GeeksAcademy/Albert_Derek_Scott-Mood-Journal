"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Blueprint, request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from api.models import db, Users, JournalEntry, Mood
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api)

@api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({'message': 'Missing email or password'}), 400)

    if Users.query.filter_by(email=data['email']).first():
        return make_response(jsonify({'message': 'User already exists'}), 409)

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = Users(email=data['email'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return make_response(jsonify({'message': 'Registered successfully'}), 201)

@api.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    user = Users.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=24))
        return jsonify({'token': access_token})

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

@api.route('/journal', methods=['POST'])
@jwt_required()
def add_journal_entry():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    if not data or not data.get('content') or not data.get('mood_id'):
        return make_response(jsonify({'message': 'Missing journal entry data'}), 400)

    new_entry = JournalEntry(user_id=current_user_id, content=data['content'], mood_id=data['mood_id'])
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

# Additional routes and logic as needed
