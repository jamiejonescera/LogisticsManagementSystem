import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables from the .env file
load_dotenv()

# Set Flask to serve the "frontend/build" folder for React
app = Flask(
    __name__,
    static_folder=os.path.join(os.path.dirname(__file__), "../frontend/build"),
    static_url_path=""
)

CORS(app)

# Configure database connection
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.getenv('SECRET_KEY')

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Test database connection route
@app.route("/db-test")
def db_test():
    try:
        # Example query to test database connection
        result = db.session.execute("SELECT 1").fetchone()
        return f"Database connection successful: {result[0]}"
    except Exception as e:
        return f"Database connection failed: {e}"

# Route to serve the React app
@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

# Catch-all route for React routing
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
