from flask import request, jsonify, make_response
from models.products import Product, ProductType
from models.supplier import Supplier
from app import db
from psycopg2.errors import NumericValueOutOfRange

# Service function to get all products
def get_products():
    products = Product.query.all()
    products_list = []

    for product in products:
        supplier = Supplier.query.get(product.supplier_id)
        
        supplier_name = supplier.supplier_name if supplier else "Unknown" 
        
        product_dict = product.to_dict()
        product_dict['supplier_name'] = supplier_name
        
        products_list.append(product_dict)

    return make_response(jsonify(products_list), 200)


# Service function to get a single product by ID
def get_product_by_id(product_id):
    product = Product.query.get(product_id)

    if product:
        return make_response(jsonify(product.to_dict()), 200)

    return make_response(jsonify({'message': 'Product not found'}), 404)


# Service function to create a new product
def create_product(data):
    try:
        name = data.get('name')
        if not name:
            return make_response(jsonify({'error': 'Product name is required'}), 400)

        supplier_id = data.get('supplier_id')
        if not supplier_id:
            return make_response(jsonify({'error': 'Supplier ID is required'}), 400)

        existing_product = Product.query.filter_by(name=name, supplier_id=supplier_id).first()
        if existing_product:
            return make_response(jsonify({'error': 'Product already exists'}), 400)

        unit_price = data.get('unit_price')
        category = data.get('category')
        product_type = data.get('product_type')

        if unit_price is None or unit_price <= 0:
            return make_response(jsonify({'error': 'Unit price must be greater than 0'}), 400)

        # Validate unit price based on precision (max value of 99999999.99)
        if unit_price >= 100000000:
            return make_response(jsonify({'error': 'Unit price exceeds maximum allowed value of 99999999.99'}), 400)

        if product_type not in [item.value for item in ProductType]:
            return make_response(jsonify({'error': 'Invalid product type'}), 400)

        supplier = Supplier.query.filter_by(supplier_id=supplier_id).first()
        if not supplier:
            return make_response(jsonify({'error': 'Supplier not found'}), 400)

        new_product = Product(
            name=name,
            unit_price=unit_price,
            category=category,
            product_type=product_type,
            supplier_id=supplier_id
        )
        
        db.session.add(new_product)
        db.session.commit()

        product_response = {
            'product_id': new_product.product_id,
            'name': new_product.name,
            'unit_price': str(new_product.unit_price) if new_product.unit_price else None,
            'category': new_product.category,
            'product_type': new_product.product_type.value,
            'supplier_id': new_product.supplier_id,
            'created_at': new_product.created_at,
            'updated_at': new_product.updated_at
        }

        return make_response(jsonify({'message': 'Product created successfully', 'product': product_response}), 201)
    
    except NumericValueOutOfRange as e:
        db.session.rollback()
        return make_response(jsonify({'error': 'Unit price is out of range. Ensure it is within the allowed limits.'}), 400)
    
    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({'error': str(e)}), 500)


def update_product(product_id, data):
    try:
        product = Product.query.get(product_id)
        if not product:
            return make_response(jsonify({'error': 'Product not found'}), 404)

        name = data.get('name')
        unit_price = data.get('unit_price')
        category = data.get('category')
        product_type = data.get('product_type')
        supplier_id = data.get('supplier_id') 

        # Check if no changes were made
        if (
            (name is None or product.name == name) and
            (unit_price is None or product.unit_price == unit_price) and
            (category is None or product.category == category) and
            (product_type is None or product.product_type.value == product_type) and
            (supplier_id is None or product.supplier_id == supplier_id)
        ):
            return make_response(jsonify({'message': 'No changes made to the product'}), 200)

        # Validate product type
        if product_type and product_type not in [item.value for item in ProductType]:
            return make_response(jsonify({'error': 'Invalid product type'}), 400)

        # Validate supplier_id
        if not supplier_id:
            return make_response(jsonify({'error': 'Supplier ID is required'}), 400)

        # Check if product with the same name and supplier already exists, excluding the current product
        if name:
            existing_product = Product.query.filter_by(name=name, supplier_id=supplier_id).first()
            if existing_product and existing_product.product_id != product_id:
                return make_response(jsonify({'error': 'Product with the same name and supplier already exists'}), 400)

        # Validate and update fields
        if name:  # Update name only if it's different
            product.name = name

        if unit_price is not None:
            if unit_price <= 0:
                return make_response(jsonify({'error': 'Unit price must be greater than 0'}), 400)
            product.unit_price = unit_price

        if category:
            product.category = category

        if product_type:
            product.product_type = ProductType(product_type)

        if supplier_id is not None:
            product.supplier_id = supplier_id

        db.session.commit()

        product_response = {
            'product_id': product.product_id,
            'name': product.name,
            'unit_price': str(product.unit_price) if product.unit_price else None,
            'category': product.category,
            'product_type': product.product_type.value,
            'supplier_id': product.supplier_id,
            'created_at': product.created_at,
            'updated_at': product.updated_at
        }

        return make_response(jsonify({'message': 'Product updated successfully', 'product': product_response}), 200)

    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({'error': str(e)}), 500)
    
# Service function to delete a product by ID
def delete_product(product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            return make_response(jsonify({'error': 'Product not found'}), 404)

        db.session.delete(product)
        db.session.commit()

        return make_response(jsonify({'message': 'Product deleted successfully'}), 200)

    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({'error': str(e)}), 500)