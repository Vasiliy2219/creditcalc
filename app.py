from flask import Flask, render_template, request, jsonify
from database import db, Calculation
import json
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///calculations.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_calculation', methods=['POST'])
def save_calculation():
    data = request.json
    calculation = Calculation(
        loan_amount=data['loanAmount'],
        term=data['term'],
        interest_rate=data['interestRate'],
        payment_type=data['paymentType'],
        schedule=json.dumps(data['schedule'])
    )
    db.session.add(calculation)
    db.session.commit()
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 5000))
    
    # Run in debug mode only if explicitly set
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    print(f"Starting Credit Calculator on port {port}")
    print(f"Debug mode: {debug}")
    print(f"Access the application at: http://localhost:{port}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)