@echo off
echo Installing Credit Calculator...
echo.

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing requirements...
pip install -r requirements.txt

echo.
echo Installation completed!
echo You can now run start.bat to start the application
pause 