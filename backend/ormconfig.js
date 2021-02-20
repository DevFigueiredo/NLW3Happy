const dotenv = require('dotenv');


module.exports ={
    "type": "sqlite",
    "database": "./src/database/database.sqlite",
    "migrations":[
    "./dist/database/migrations/*.js"
    ],
    "entities":[
   "./dist/models/*.js"
    ],
    "cli":{
        "migrationsDir":"./dist/database/migrations"
    }
}