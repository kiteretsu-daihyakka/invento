cd frontend\frontend_react
call npm run build
cd ../..
git add *
git commit -m "%*"
git push
python deploy.py