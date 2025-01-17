from flask import Blueprint, request
from sqlalchemy.sql import text

@app.route('/test_db')
def test_db():
    try:
        result = db.session.execute(text('SELECT 1')).scalar()
        return f"Database connection successful: {result}"
    except Exception as e:
        return f"Database connection failed: {e}"
