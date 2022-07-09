import webbrowser as wb
import pyautogui as auto
import time

# wb.open('https://www.pythonanywhere.com/user/Invento/consoles/24879800/')
auto.hotkey('alt','tab')
time.sleep(3)
auto.write('bash ./shoot.sh')
time.sleep(2)
auto.press('enter')
time.sleep(10)
auto.write('yes')
time.sleep(1)
auto.press('enter')
time.sleep(5)
auto.write('touch /var/www/cochewen_pythonanywhere_com_wsgi.py')
time.sleep(3)
auto.press('enter')