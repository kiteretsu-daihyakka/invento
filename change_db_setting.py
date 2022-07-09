with open('./invento/settings.py','r') as f:
    with open('./invento/settings_pythonanywhere.py','w') as n:
        for line in f.readlines():
            if line.startswith("IS_ON_PROD"):
                line = "IS_ON_PROD = True\n"
            n.write(line)
with open('./invento/settings_pythonanywhere.py','r') as f:
    with open('./invento/settings.py','w') as n:
        for line in f.readlines():
            n.write(line)