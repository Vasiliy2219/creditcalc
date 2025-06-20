#!/bin/bash

echo "Deploying Credit Calculator to VPS..."
echo

# Update system
sudo apt update
sudo apt install -y python3 python3-pip python3-venv nginx

# Create application directory
sudo mkdir -p /var/www/credit-calculator
sudo chown $USER:$USER /var/www/credit-calculator

# Copy application files
cp -r . /var/www/credit-calculator/

# Setup virtual environment
cd /var/www/credit-calculator
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create systemd service
sudo tee /etc/systemd/system/credit-calculator.service > /dev/null <<EOF
[Unit]
Description=Credit Calculator
After=network.target

[Service]
User=$USER
WorkingDirectory=/var/www/credit-calculator
Environment="PATH=/var/www/credit-calculator/venv/bin"
ExecStart=/var/www/credit-calculator/venv/bin/gunicorn app:app --bind 127.0.0.1:8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Start service
sudo systemctl daemon-reload
sudo systemctl enable credit-calculator
sudo systemctl start credit-calculator

# Setup nginx
sudo tee /etc/nginx/sites-available/credit-calculator > /dev/null <<EOF
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/credit-calculator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

echo "Deployment completed!"
echo "Your app should be available at: http://your-domain.com" 