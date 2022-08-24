# 104 Business Master Checkin
-----------
The program was modified based on the project:
- https://github.com/tw-lws/104-checkin

-----------
## Disclaimer
It is only used to test and practice the open source API, puppeteer.
I am unable to know the misuse of the other people.
I shall not be held responsible for the misuse of the others.

-----------
## Program Process
1. Launches a browser
2. Logins the account
3. Goes to the private secretary
4. Clocks in or out
6. Screenshots
7. Closes the browser

------
## Steps to use
1. Gets an Ubuntu machine
2. Installs nodejs and npm
3. Clones the project via the git command
4. Installs the node modules
   - npm install
5. Creates a directory 'records' to store the screenshots
6. Modifies the information in the file 'config/default.json'
   ```
    "user": {
        "username":"username@example.com",
        "password":"password"
    }
   ```
6. Executes the program
   - node checkin.js
7. Checks out the screenshot in the records directory

-----------
## Debug
Modifies the 'headless' to be false in the 'checkin.js'
- headless: false,

With that, we can see the status how the program works.
