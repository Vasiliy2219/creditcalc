from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Calculation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    loan_amount = db.Column(db.Float, nullable=False)
    term = db.Column(db.Integer, nullable=False)
    interest_rate = db.Column(db.Float, nullable=False)
    payment_type = db.Column(db.String(20), nullable=False)
    schedule = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())