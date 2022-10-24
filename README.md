# ASDTradie
Trade Trades is a group project made for Advanced Software Development at UTS. It simulates a marketplace where customers can hire tradies for jobs - much like Fiverr or Freelancer.com. 

# Contributors
1. 13951330 - Zachary Meissner
2. 12954121 - Danielle Alota (Team Lead)
3. 13910144 - Hriday Bashyal
4. 13572019 - Ranvir Dogra
5. 14302172- Aliza Faisal

# Feature Assignments
- Zach - Work History and Order History
- Danielle - User Account Management and User Access Management
- Hriday - Review System and Comment System
- Ranvur - Customer Dashboard and Tradie Dashboard
- Aliza - Service Management and Approval Process Management

# How To Use This Project
To begin the web application, complete the following steps:
- Download the project zip file through GitHub
- Download Node.js if needed: https://nodejs.org/en/download/ 
- Extract project files from the zip file, and place them into a folder.
- In a terminal (or command prompt for Windows), navigate to the folder the project files are in.
- Type npm install -g npm to install npm, which is a widely used package manager for JS projects.
- Type npm install to download all npm packages needed for this project.
- Type node app.js to run the server.
- In a browser, type http://localhost:3000/ to begin using the web application.
- When finished, stop the server by doing CTRL+C on the terminal.

# Application Structure
For this application, the team has implemented a MVC architecture pattern.
- The models folder includes all the files that outline the strcture of each feature's schema.
- The views and the public folder includes all of our web pages. This also includes partials which allows for alerts.
- Though there is no specific controllers folder, the routes folder holds all the controllers of the application - it handles passing data to different pages, user persistence and applies changes to the database.

# Web App Tech Stack
## Frontend
- HTML/CSS
- Bootstrap
- Javascript

## Backend
- Node.js
- ExpressJS
- Mongoose
- MongoDB
- Bcrypt
- PassportJS
- Connect-flash
