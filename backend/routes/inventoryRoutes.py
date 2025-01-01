from flask import Blueprint, request
from services.inventoryServices import get_inventory

# Create Blueprint for inventory
inventory_bp = Blueprint('inventory', __name__, url_prefix='/api/inventory')

# Route to get all inventory
@inventory_bp.route('/', methods=['GET'])
def fetch_inventory():
    return get_inventory() 
