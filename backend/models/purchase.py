from app import db
from datetime import datetime
import pytz
from enum import Enum

# Set Manila timezone
MANILA_TZ = pytz.timezone("Asia/Manila")

class PurchaseRequestStatusEnum(Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class PurchaseRequest(db.Model):
    __tablename__ = 'purchase_requests'

    request_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Enum(PurchaseRequestStatusEnum), default=PurchaseRequestStatusEnum.PENDING, nullable=False)
    request_date = db.Column(db.DateTime, default=datetime.now(MANILA_TZ))
    total_amount = db.Column(db.Numeric(10, 2))

    # Relationship to the Product model
    product = db.relationship('Product', backref='purchase_requests')

    def __repr__(self):
        return f"<PurchaseRequest {self.request_id}>"

    def to_dict(self):
        return {
            'request_id': self.request_id,
            'product_id': self.product_id,
            'product_name': self.product.name if self.product else None,
            'supplier_name': self.product.supplier.supplier_name if self.product and self.product.supplier else None,
            'quantity': self.quantity,
            'status': self.status.value,
            'request_date': self.request_date,
            'total_amount': str(self.total_amount) if self.total_amount else '0.00' 
        }