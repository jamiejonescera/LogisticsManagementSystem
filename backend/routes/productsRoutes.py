from app import app
from flask import Blueprint, request
from services.productsServices import create_product, get_products, update_product, delete_product, get_product_by_id

# Create Blueprint for product
product_bp = Blueprint('product', __name__, url_prefix='/api/products')

# Route to get all products
@product_bp.route('/', methods=['GET'])
def fetch_products():
    return get_products()

@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product_by_id_route(product_id):
    return get_product_by_id(product_id)

# Route to create a new product
@product_bp.route('/create', methods=['POST'])
def create_new_product():
    data = request.json
    if not data:
        return {"error": "Invalid input data. Please provide valid product details."}, 400

    try:
        result = create_product(data)
        return {
            "message": "Product created successfully!",
            "product": result
        }, 201
    except Exception as e:
        return {
            "error": f"An error occurred while creating the product: {str(e)}"
        }, 500


# Route to update an existing product
@product_bp.route('/update/<int:product_id>', methods=['PUT'])
def update_existing_product(product_id):
    data = request.json
    return update_product(product_id, data)

@product_bp.route('/delete/<int:product_id>', methods=['DELETE'])
def delete_product_route(product_id):
    return delete_product(product_id)
