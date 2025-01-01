from flask import Blueprint, request
from services.purchaseServices import create_purchase_request, get_purchase_requests, get_recent_purchase_requests, delete_purchase_request

# Create Blueprint for purchase-related routes
purchase_bp = Blueprint('purchase', __name__, url_prefix='/api/purchase')

# Route to get all products
@purchase_bp.route('/', methods=['GET'])
def fetch_purchase_requests():
    return get_purchase_requests()

# Route to get all products
@purchase_bp.route('/recent', methods=['GET'])
def fetch_recent_purchase_requests():
    return get_recent_purchase_requests()

# Route to create a new purchase request
@purchase_bp.route('/create', methods=['POST'])
def create_new_purchase():
    data = request.json 
    return create_purchase_request(data)

@purchase_bp.route('/delete/<int:request_id>', methods=['DELETE'])
def delete_purchase_request_route(request_id):
    return delete_purchase_request(request_id)

