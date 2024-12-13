# from app import app
# from flask import Blueprint, request
# from services.evaluateServices import evaluate_purchase_request

# # Create Blueprint for evaluation
# evaluate_bp = Blueprint('evaluate', __name__, url_prefix='/api/evaluate')

# @evaluate_bp.route('/create', methods=['POST'])
# def evaluate_request():
#     data = request.get_json()
#     return evaluate_purchase_request(data)
