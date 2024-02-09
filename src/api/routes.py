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

@api.route('/hello', methods=['GET'])
@jwt_required()
def handle_hello():

    msg = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    current_user = get_jwt_identity()
    return jsonify(logged_in_as = current_user), 200

@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email', None)
    access_token = create_access_token(identity = email)
    return jsonify(access_token = access_token)

@api.route('/user/<int:id>', methods=["GET"])
def get_user(id):
    user = Users.query.get(id)
    if user is None:
        raise APIException("user not fount", status_code = 404)
    return jsonify(user.serialize()), 200

@api.route('/user', methods=["GET"])
def get_all_users():
    users = Users.query.all()
    all_users = list(map(lambda x:x.serialize(),users))
    return jsonify(all_users), 200

@api.route('/signup', methods = ['POST'])
def create_user():
    body = request.get_json()
    user = Users()
    if "email" not in body:
        raise APIException('You need to specify the email', 400)
    if "password_hash" not in body:
        raise APIException('You need to specify the password', 400)    
    user.email = body['email']
    user.password_hash = hashlib.sha256(body['password_hash'].encode("utf-8")).hexdigest()
    user.is_active = True
    has_user = Users.query.filter_by(email = user.email, password_hash = user.password_hash).first()
    if has_user is None:
        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize()), 200
    else:
        return jsonify("User Already Exists")
   

@api.route('/login', methods = ['POST'])
def login():
    body = request.get_json()
    user = Users()
    if "email" not in body:
        raise APIException('You need to specify the email', 400)
    if "password_hash" not in body:
        raise APIException('You need to specify the password', 400)    
    user.email = body['email']
    user.password_hash = hashlib.sha256(body['password_hash'].encode("utf-8")).hexdigest()
    user.is_active = True
    has_user = Users.query.filter_by(email = user.email, password_hash = user.password_hash).first()
    if has_user is not None:
        access_token = create_access_token(identity = user.token)
        return jsonify(access_token = access_token)
    else:
        return jsonify("Email and/or Password not found")

@api.route('/user/<int:id>', methods = ['PUT'])
def update_user(id):
    body = request.get_json()
    user = Users.query.get(id)
    if user is None:
        raise APIException("user not found", status_code = 404) 
    if "email" in body: 
        user.email = body["email"]       
    if "password_hash" in body: 
        user.password_hash = body["password_hash"]
    if "is_active" in body: 
        user.is_active = body["is_active"]
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/user/<int:id>', methods = ['DELETE'])
def delete_user(id): 
    user = Users.query.get(id)
    if user is None:
        raise APIException("user not fount", status_code = 404)
    db.session.delete(user)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/private', methods = ['GET'])
@jwt_required()
def get_private():
    return jsonify({'msg':'This is a private end point. You need to be logged in to see it'}), 200