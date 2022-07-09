cd frontend\frontend_react
call npm run build
cd ../..
python change_db_setting.py
git add *
git commit -m "%*"
git push
python deploy.py