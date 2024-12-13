from flask import request, jsonify, make_response
from models.purchase import PurchaseRequest, PurchaseRequestStatusEnum
from models.products import Product
from models.supplier import Supplier
from app import db


# Service function to get all purchase requests
def get_purchase_requests():
    purchase_requests = PurchaseRequest.query.all()
    purchase_requests_list = [purchase_request.to_dict() for purchase_request in purchase_requests]

    return make_response(jsonify(purchase_requests_list), 200)


# # Service function to get 5 recent purchase requests
def get_recent_purchase_requests():
    recent_purchase_requests = PurchaseRequest.query.order_by(PurchaseRequest.request_id.desc()).limit(5).all()
    recent_purchase_requests_list = [purchase_request.to_dict() for purchase_request in recent_purchase_requests]

    return make_response(jsonify(recent_purchase_requests_list), 200)



# Service function to create a new purchase request
def create_purchase_request(data):
    try:
        product_id = data.get('product_id')
        quantity = data.get('quantity')

        if not product_id:
            return make_response(jsonify({'error': 'Product ID is required'}), 400)

        product = Product.query.filter_by(product_id=product_id).first()
        if not product:
            return make_response(jsonify({'error': 'Product not found'}), 404)

        if quantity is None or quantity <= 0:
            return make_response(jsonify({'error': 'Quantity must be greater than 0'}), 400)

        new_request = PurchaseRequest(
            product_id=product_id,
            quantity=quantity
        )

        db.session.add(new_request)
        db.session.commit()

        request_response = {
            'request_id': new_request.request_id,
            'product_id': new_request.product_id,
            'product_name': product.name,
            'quantity': new_request.quantity,
            'status': new_request.status.value,
            'request_date': new_request.request_date
        }

        return make_response(jsonify({'message': 'Purchase request created successfully', 'purchase_request': request_response}), 201)

    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({'error': str(e)}), 500)
    
# Delete an existing purchase request
def delete_purchase_request(request_id):
    try:
        purchase_request = PurchaseRequest.query.get(request_id)

        if not purchase_request:
            return jsonify({'error': 'Purchase request not found'}), 404

        db.session.delete(purchase_request)
        db.session.commit()

        return jsonify({'message': 'Purchase request cancelled successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
