from flask import request, jsonify, Blueprint
from api.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import jwt
import datetime
import os

api = Blueprint("api", __name__)
CORS(api) 

SECRET_KEY = os.getenv("SECRET_KEY", "una_clave_muy_segura")

@api.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    name = data.get("name")
    last_name = data.get("last_name")
    email = data.get("email")
    password = data.get("password")

    if not all([name, last_name, email, password]):
        return jsonify({"error": "Missing fields"}), 400

   
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    
    new_user = User(
        name=name,
        last_name=last_name,
        email=email
    )
    new_user.set_password(password)  

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user": new_user.serialize()}), 201

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    
    if not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

   
    return jsonify({
        "message": "Login successful",
        "user": user.serialize()
    }), 200
    
@api.route("/logout", methods=["POST"])
def logout():
    return jsonify({"message": "Logout successful. Delete the token on the client side."}), 200