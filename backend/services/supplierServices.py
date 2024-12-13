from flask import request, jsonify, make_response
from models.supplier import Supplier
from app import db

# Service function to get all suppliers
def get_suppliers():
    suppliers = Supplier.query.all()
    supplier_list = [supplier.to_dict() for supplier in suppliers]

    return make_response(jsonify(supplier_list), 200)


# Service function to get a single supplier by ID
def get_supplier_by_id(supplier_id):
    supplier = Supplier.query.get(supplier_id)

    if supplier:
        return make_response(jsonify(supplier.to_dict()), 200)

    return make_response(jsonify({'message': 'Supplier not found'}), 404)


# Service function to create a new supplier
def create_supplier(data):
    try:

        supplier_name = data.get('supplier_name')
        if not supplier_name:
            return make_response(jsonify({'error': 'Supplier name is required'}), 400)
        
        existing_supplier = Supplier.query.filter_by(supplier_name=supplier_name).first()
        if existing_supplier:
            return make_response(jsonify({'error': 'Supplier already exists'}), 400)

        address = data.get('address')
        contact_number = data.get('contact_number')

        if contact_number:
            if not contact_number.isdigit() or len(contact_number) != 11:
                return make_response(jsonify({'error': 'Contact number must be exactly 11 digits and numeric'}), 400)

        new_supplier = Supplier(
            supplier_name=supplier_name,
            address=address,
            contact_number=contact_number
        )
        db.session.add(new_supplier)
        db.session.commit()

        # Prepare response data
        supplier_response = {
            'supplier_id': new_supplier.supplier_id,
            'supplier_name': new_supplier.supplier_name,
            'address': new_supplier.address,
            'contact_number': new_supplier.contact_number,
            'created_at': new_supplier.created_at,
            'updated_at': new_supplier.updated_at
        }

        return make_response(jsonify({'message': 'Supplier created successfully', 'supplier': supplier_response}), 201)
    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({'error': str(e)}), 500)


# Service function to update an existing supplier
def update_supplier(supplier_id, data):
    try:
        supplier = Supplier.query.get(supplier_id)
        if not supplier:
            return make_response(jsonify({'error': 'Supplier not found'}), 404)

        supplier_name = data.get('supplier_name')
        address = data.get('address')
        contact_number = data.get('contact_number')

        if (
            supplier_name and supplier.supplier_name == supplier_name and
            address and supplier.address == address and
            contact_number and supplier.contact_number == contact_number
        ):
            return make_response(jsonify({'message': 'No changes made to the supplier.'}), 200)
        

        if supplier_name:
            existing_supplier = Supplier.query.filter_by(supplier_name=supplier_name).first()
            if existing_supplier and existing_supplier.supplier_id != supplier_id:
                return make_response(jsonify({'error': 'Supplier with this name already exists'}), 400)
            supplier.supplier_name = supplier_name

        if contact_number:
            if not contact_number.isdigit() or len(contact_number) != 11:
                return make_response(jsonify({'error': 'Contact number must be exactly 11 digits and numeric'}), 400)
            supplier.contact_number = contact_number

        if address:
            supplier.address = address

        db.session.commit()

        supplier_response = {
            'supplier_id': supplier.supplier_id,
            'supplier_name': supplier.supplier_name,
            'address': supplier.address,
            'contact_number': supplier.contact_number,
            'created_at': supplier.created_at,
            'updated_at': supplier.updated_at
        }

        return make_response(jsonify({'message': 'Supplier updated successfully', 'supplier': supplier_response}), 200)

    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({'error': str(e)}), 500)


# Delete an existing supplier
def delete_supplier(supplier_id):
    try:
        supplier = Supplier.query.get(supplier_id)
        
        if not supplier:
            return jsonify({'error': 'Supplier not found'}), 404
        
        db.session.delete(supplier)
        db.session.commit()

        return jsonify({'message': 'Supplier deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
