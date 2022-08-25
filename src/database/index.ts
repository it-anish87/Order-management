//Creating a Database class from database connection/disconnection/sync

import { Sequelize } from "sequelize";
import { registerModels } from "../models";

export default class Database {
    dbConfig: any;
    connection: any; 
    constructor(dbConfig: any){
        this.dbConfig = dbConfig;
    }
    async connect(){
        //create connection
        const {db_name, db_user, db_password} = this.dbConfig; //destructure dbConfig and assign in variables
        this.connection = new Sequelize(db_name, db_user, db_password, { //property to hold new Sequelize instance
            host: 'localhost',
            dialect: 'postgres',
            logging: false  //db loggin
          });
          
          await this.connection.authenticate({logging: false}); //establishes connection using the connection property
          console.log("Database connected successfully");
          
          //Register all models
          registerModels(this.connection);

          this.sync(); //sync the models
    };
    //disconnect database
    async disconnect(){
        await this.connection.close();
    };
    //sync db force:true - drops existing and creates new table
    async sync(){
        await this.connection.sync({
            //force: true  //alter: true
        });
        console.log("Connection synced");
    };
}