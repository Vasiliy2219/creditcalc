@echo off
echo Starting Credit Calculator...
echo.

REM Check if virtual environment exists
if not exist "venv\Scripts\activate.bat" (
    echo Error: Virtual environment not found!
    echo Please run install.bat first to set up the environment.
    pause
    exit /b 1
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate

REM Check if requirements are installed
echo Checking dependencies...
python -c "import flask" 2>nul
if errorlevel 1 (
    echo Error: Dependencies not installed!
    echo Please run install.bat first.
    pause
    exit /b 1
)

echo Starting Flask application...
echo The application will be available at: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
python app.py
pause