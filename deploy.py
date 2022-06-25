import webbrowser as wb
import pyautogui as auto
import time

wb.open('https://www.pythonanywhere.com/user/Invento/consoles/24754049/')
time.sleep(10)
auto.write('bash ./shoot.sh')
auto.press('enter')
time.sleep(5)
auto.write('yes')
auto.press('enter')
time.sleep(5)
auto.write('touch /var/www/cochewen_pythonanywhere_com_wsgi.py')
auto.press('enter')