@REM cd frontend\frontend_react
@REM call npm run build
@REM cd ../..
@REM python change_db_setting.py
git add *
git commit -m "%*"
git push
@REM python deploy.py