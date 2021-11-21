This is has:

authentication useing bcrypt and passport mongoose and jwt

rest api for vacation you are able to add update or delete vacations  



Express based api

Vacations Routes :
//_ get returns all items http://localhost:3001/vacations/
//_ get returns all items http://localhost:3001/vacations/:id
//_ search requires id http://localhost:3001/vacations/search/:city
//_ post requires fields via req.body http://localhost:3001/vacations/add-vacation
//_ delete requires id http://localhost:3001/vacations/delete/:id
//_ patch requires via req.body id and fields http://localhost:3001/vacations/update

fields: {
id,
title,
city,
street,
category,
image,
bedrooms,
shared,
description,
dailyRate,
}

User Routes :
//_ http://localhost:3001/users/register-user
//_ http://localhost:3001/users/register-admin
//_ http://localhost:3001/users/login-user
//_ http://localhost:3001/users/login-admin

user fields required :
{
name: {
type: String,
min: [4, "Too short,min is 4 characters"],
max: [32, "Too long,max is 32 characters"],
required: true,
},
lastName: {
type: String,
min: [4, "Too short,min is 4 characters"],
max: [32, "Too long,max is 32 characters"],
required: true,
},
email: {
type: String,
min: [4, "Too short,min is 4 characters"],
max: [32, "Too long,max is 32 characters"],
unique: true,
lowercase: true,
required: true,
match: [/^\w+([\.-]?\w+)_@\w+([\.-]?\w+)_(\.\w{2,3})+$/],
},
hash: {
type: String,
min: [4, "Too short,min is 4 characters"],
max: [100, "Too long,max is 32 characters"],
required: true,
},
role: {
type: String,
default: "user",
enum: ["user", "admin"],
},
},

"dependencies": {
"bcrypt": "^5.0.1",
"cors": "^2.8.5",
"dotenv": "^10.0.0",
"express": "^4.17.1",
"jsonwebtoken": "^8.5.1",
"mongoose": "^6.0.13",
"morgan": "^1.10.0",
"nodemon": "^2.0.15",
"passport": "^0.5.0",
"passport-jwt": "^4.0.0"
}

Usage :

Create .env file with this variables

APP_DB=your connection string to mongoose
APP_SECRET = your secret
APP_PORT = port
npm i and have fun
