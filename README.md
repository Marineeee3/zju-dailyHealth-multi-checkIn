# zju-dailyHealth-multi-checkIn

This project is modified from the [ZJU-Clock-In](https://github.com/vtu81/ZJU-Clock-In), on top of which, `multi-account` support is added. 

# Tutorials
The general steps are same, except for the __Step2__ & __Step3__.

### Step1: Fork this repo
Fork this project to your personal repo. <img src="https://gitee.com/dizhipeng/image/raw/master/img/008i3skNly1gq6dacfvdjj31yy0u07ed.jpg" width="600px">

### Step2: Add `ACCOUNT` & `PASSWORD`
Under this repo, go to __"Settings"__

Click __"New repository secret"__ -> add a variable named `ACCOUNT`, value set to __your uni account name__; another variable named `PASSWORD` with value __your uni account password__
<img src="https://s2.loli.net/2022/05/15/3gJuRcLhEqdz2TF.png" width="600px">

For __multiple accounts__, suffix numbers to the variables accordingly, e.g. `ACCOUNT2`-`PASSWORD2`, `ACCOUNT3`-`PASSWORD3`, ...

### Step3: Modify YML file
Modify the workflow file content in `.github/workflows/main.yml`
<img src="https://s2.loli.net/2022/05/15/Ma1BjOyZhLdUPeC.png" width="600px">

Make sure the `username` &`password` variables under `jobs.HealthCheckIn.strategy.matrix.include` inline with the secret variables you set in __Step2__

### Step4: Trigger the workflow
Go to __"Action"__ -> __"HealthCheckIn"__ -> __"Run workflow"__ to trigger this workflow.
<img src="https://s2.loli.net/2022/05/15/uXkIRCFmJxYpc72.png" width="600px">

Another method to trigger it is by clicking the ![Star on GitHub](https://img.shields.io/github/stars/jonsn0w/hyde.svg?style=social) button: star it and unstar it again.
### Step5
Click the action link to check the action results
<img src="https://s2.loli.net/2022/05/15/FQe7gUsLYAd6VPI.png" width="600px">
