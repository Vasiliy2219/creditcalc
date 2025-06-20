@echo off
echo Setting up ngrok for internet access...
echo.

REM Check if ngrok is installed
if not exist "ngrok.exe" (
    echo Downloading ngrok...
    echo Please download ngrok from https://ngrok.com/download
    echo Extract ngrok.exe to this folder
    pause
    exit /b 1
)

echo Starting Flask application in background...
start /B python app.py

echo Waiting for Flask to start...
timeout /t 3 /nobreak >nul

echo Starting ngrok tunnel...
echo Your app will be available at the URL shown below
echo.
ngrok http 5000

pause 