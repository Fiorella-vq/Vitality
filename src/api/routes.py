from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS
from werkzeug.security import generate_password_hash

api = Blueprint("api", __name__)

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
        return jsonify({"error": "El usuario ya existe"}), 409

    hashed_password = generate_password_hash(password)

    new_user = User(
        name=name,
        last_name=last_name,
        email=email,
        password=hashed_password,
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Usuario creado correctamente",
        "user": new_user.serialize()
    }), 201