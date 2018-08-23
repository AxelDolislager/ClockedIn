# Changes
Refactoring 14th of August.

## Structure
```
.
├── index.js
├── package.json
├── config
│   └── config.js
├── models
│   ├── project.js
│   └── user.js
├── public
│   ├── css
│   │   └── style.css
│   └── images
├── routes
│   ├── index.js
│   ├── projects.js
│   └── users.js
└── views
    ├── partials
    │   ├── footer.ejs
    │   └── header.ejs
    ├── projects
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── show.ejs
    └── users
        ├── login.ejs
        └── register.ejs
```

  ###### **index.js**
  - Removed Morgan (Add Again?)
  - Removed Flash (Add Later)
  - Removed Cookie Parser (used for?)
  - Added User & Project Models
  - Router for Routing
  - Implemented Enviroment Variables to use Cloud9 and Heroku (Variables from config/config.js)
 
  ###### **package.json**
  - changed `npm start` to `node index.js` for Heroku
  - Added `npm run dev` to execute `nodemon index.js`
  - Added Meta Data About Project 

  ###### **config/config.js**
  - Holds enviroment dependent or sensitive data
  - `PORT` - Server Port 
  - `IP` - Server IP Adress
  - `SESSION_SECRET` - Key for Session Encryption
  - `MONGODB_URI` - MongoDB Connection String

  ###### **models/project.js**  
  - `projectName` - Name
  - `totalTimeSpend` - Total time in seconds (default: 0)
  - `createdAt` - Timestamp
  - `author` - References a User from the User Model
  - `tasks` - TODO: list of refererences to Tasks from Task Model
  
  ###### **models/user.js**
  - Added `passport-local-mongoose` - implements password hashing and authentication functions
  - Changed `email` to `username` to comply with passport-local-mongoose
  - Other data: `password`, `fullname` and `initials`

  ###### **public/**
  - Public assets
  
  ###### **routes/index.js**
  - `/` - redirects to login

  ###### **routes/projects.js**
  - Restfull Routing

| **Name**   | **URL**            | **HTTP Verb** |  **Description**|
|------------|--------------------|---------------|-----------------|
|Index       | /projects/         | GET           | List all projects from a user
|New         | /projects/new      | GET           | Show new project form   
|Create      | /projects          | POST          | Create a new project in the DB, redirect back to projects   
|Show        | /projects/:id      | GET           | Show info about a specific project
|Edit        | /projects/:id/edit | GET           | Show edit form for a project       
|Update      | /projects/:id      | PATCH/PUT     | Update project info in the db, redirect back to that projects Show page    
|Destroy     | /projects/:id      | DELETE        | Delete project 

  ###### **routes/users.js**
  - GET `/login` - Show Login Form
  - POST `/login` - Process Login
  - GET `/register` - Show Register Form
  - POST `/register` - Process User Registeration
  - GET `/logout` - Destroys User Session

## Development ToDo's
__**Managment**__  
[ ] Find A Name  

__**Middleware**__  
[ ] Check if Logged In  
[ ] Check Ownership (if the user is the author of the project/task)  
[ ] Reimplement Morgan & Flash  

__**Features**__  
[ ] Project Edit, Update, Delete  
[ ] Tasks  







