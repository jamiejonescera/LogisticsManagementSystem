from app import db
from datetime import datetime
import pytz

MANILA_TZ = pytz.timezone("Asia/Manila")

class Inventory(db.Model):
    __tablename__ = 'inventory'

    inventory_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False) 
    available_quantity = db.Column(db.Integer, nullable=False)
    running_amount = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(MANILA_TZ))
    updated_at = db.Column(db.DateTime, default=datetime.now(MANILA_TZ), onupdate=datetime.now(MANILA_TZ))

    # Relationship with Product
    product = db.relationship('Product', backref='inventory')

    def __repr__(self):
        return f"<Inventory {self.inventory_id} for Product {self.product.name}>"

    def to_dict(self):
        return {
            'inventory_id': self.inventory_id,
            'product_id': self.product_id,
            'product_name': self.product.name if self.product else None,
            'supplier_name': self.product.supplier.supplier_name if self.product and self.product.supplier else None,
            'quantity': self.quantity,
            'available_quantity': self.available_quantity,
            'running_amount': str(self.running_amount),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
