from app import db
from datetime import datetime
import pytz
from enum import Enum

MANILA_TZ = pytz.timezone("Asia/Manila")

class ProductType(Enum):
    item = "item"
    asset = "asset"

class Product(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    unit_price = db.Column(db.Numeric(10, 2))
    category = db.Column(db.String(100))
    product_type = db.Column(db.Enum(ProductType), nullable=False)
    supplier_id = db.Column(db.Integer, db.ForeignKey('suppliers.supplier_id'))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(MANILA_TZ))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(MANILA_TZ), onupdate=lambda: datetime.now(MANILA_TZ))

    supplier = db.relationship('Supplier', backref='products')

    # Add composite unique constraint
    __table_args__ = (
        db.UniqueConstraint('name', 'supplier_id', name='products_name_supplier_unique'),
    )

    def __repr__(self):
        return f"<Product {self.name}>"

    def to_dict(self):
        return {
            'product_id': self.product_id,
            'name': self.name,
            'unit_price': str(self.unit_price) if self.unit_price else None,
            'category': self.category,
            'product_type': self.product_type.value,
            'supplier_id': self.supplier_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
