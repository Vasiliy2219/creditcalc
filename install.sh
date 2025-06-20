#!/bin/bash

echo "Installing Credit Calculator..."
echo

echo "Creating virtual environment..."
python3 -m venv venv

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing requirements..."
pip install -r requirements.txt

echo
echo "Installation completed!"
echo "You can now run: source venv/bin/activate && python app.py" 