from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from datetime import datetime

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    journal_entries = db.relationship('JournalEntry', backref='author', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'journal_entries': [entry.serialize() for entry in self.journal_entries]
        }

class JournalEntry(db.Model):
    __tablename__ = 'journal_entries'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    mood_id = db.Column(db.Integer, db.ForeignKey('moods.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'mood_id': self.mood_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'mood': self.mood.serialize()
        }

class Mood(db.Model):
    __tablename__ = 'moods'
    id = db.Column(db.Integer, primary_key=True)
    mood_type = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.Text)
    journal_entries = db.relationship('JournalEntry', backref='mood', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'mood_type': self.mood_type,
            'description': self.description
        }


# class Tag(db.Model):
#     __tablename__ = 'tags'
#     id = db.Column(db.Integer, primary_key=True)
#     tag_name = db.Column(db.String(50), nullable=False)
#     journal_entries = db.relationship('JournalEntry', secondary='journal_entries_tags', back_populates='tags')

# class JournalEntriesTags(db.Model):
#     __tablename__ = 'journal_entries_tags'
#     entry_id = db.Column(db.Integer, db.ForeignKey('journal_entries.id'), primary_key=True)
#     tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)


# class Analytics(db.Model):
#     __tablename__ = 'analytics'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     mood_type_id = db.Column(db.Integer, db.ForeignKey('moods.id'), nullable=False)
#     count = db.Column(db.Integer, nullable=False)
#     period = db.Column(db.DateTime, nullable=False)
