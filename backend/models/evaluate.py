from app import db
from datetime import datetime
import pytz

# Set Manila timezone
MANILA_TZ = pytz.timezone("Asia/Manila")

class Evaluation(db.Model):
    __tablename__ = 'evaluation'

    evaluation_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    request_id = db.Column(db.Integer, db.ForeignKey('purchase_requests.request_id'), nullable=False)
    undamaged_quantity = db.Column(db.Integer, nullable=False, default=0)
    damaged_quantity = db.Column(db.Integer, nullable=False, default=0)
    evaluation_date = db.Column(db.DateTime, default=lambda: datetime.now(MANILA_TZ))

    # Relationship to the PurchaseRequest model
    purchase_request = db.relationship('PurchaseRequest', backref='evaluations')

    def __repr__(self):
        return f"<Evaluation {self.evaluation_id}>"

    def to_dict(self):
        return {
            'evaluation_id': self.evaluation_id,
            'request_id': self.request_id,
            'product_id': self.purchase_request.product_id if self.purchase_request else None,
            'product_name': self.purchase_request.product.name if self.purchase_request and self.purchase_request.product else None,
            'supplier_name': self.purchase_request.product.supplier.supplier_name 
                             if self.purchase_request and self.purchase_request.product and self.purchase_request.product.supplier else None,
            'quantity': self.purchase_request.quantity if self.purchase_request else None,
            'request_date': self.purchase_request.request_date if self.purchase_request else None,
            'undamaged_quantity': self.undamaged_quantity,
            'damaged_quantity': self.damaged_quantity,
            'status': self.purchase_request.status.value if self.purchase_request else None,  
            'evaluation_date': self.evaluation_date
        }
