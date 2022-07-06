#!/bin/bash
echo "run kiosk"
sudo -upi DISPLAY=:0.0 chromium-browser -kiosk --app=http://127.0.0.1:8080/survey/ --start-fullscreen --no-sandbox --user-data-dir
