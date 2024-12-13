from app import app, db
from sqlalchemy import text
from models.users import User
from models.supplier import Supplier
from models.department import DepartmentFacility
from models.products import Product
from models.purchase import PurchaseRequest
from models.evaluate import Evaluation
from models.inventory import Inventory
from models.damage import DamagedItem

# Create the tables and define triggers
with app.app_context():
    try:
        db.drop_all()
        db.create_all()

        trigger_sql = """
        CREATE OR REPLACE FUNCTION calculate_total_amount()
        RETURNS TRIGGER AS $$ 
        BEGIN
            -- Calculate total_amount based on quantity and product's unit_price
            NEW.total_amount := NEW.quantity * (
                SELECT unit_price FROM products WHERE product_id = NEW.product_id
            );
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        -- Create the trigger to execute before insert or update
        CREATE TRIGGER trigger_calculate_total_amount
        BEFORE INSERT OR UPDATE ON purchase_requests
        FOR EACH ROW
        EXECUTE FUNCTION calculate_total_amount();
        """
        
        # Use db.session.execute() with the text() function to execute the SQL
        db.session.execute(text(trigger_sql))
        db.session.commit()

        print("Tables and triggers created successfully.")
    except Exception as e:
        print(f"An error occurred while setting up the database: {e}")
