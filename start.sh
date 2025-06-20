#!/bin/bash

echo "Starting Credit Calculator..."
echo

# Check if virtual environment exists
if [ ! -f "venv/bin/activate" ]; then
    echo "Error: Virtual environment not found!"
    echo "Please run ./install.sh first to set up the environment."
    exit 1
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Check if requirements are installed
echo "Checking dependencies..."
python -c "import flask" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "Error: Dependencies not installed!"
    echo "Please run ./install.sh first."
    exit 1
fi

echo "Starting Flask application..."
echo "The application will be available at: http://localhost:5000"
echo "Press Ctrl+C to stop the server"
echo
python app.py 