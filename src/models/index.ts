import fs from 'fs';
import path from 'path';
import { Model, Sequelize } from 'sequelize';

let models: any = {}; 

//register models - takes parameter connection -instance of new Sequelize
export function registerModels(connection : Sequelize){ //connection type - Sequelize - instance of Sequelize class
    const thisFile = path.basename(__filename); //_filename - entire path, basename - index.ts
    const modelFiles = fs.readdirSync(__dirname); //readdirSync -read all files in this folder, _dirname - path to the models folder
    const filteredModelFiles = modelFiles.filter((file) => { //filter all files that is not index.js and ends with .ts
        return file !== thisFile && file.slice(-3) === '.ts'; //filter returns an array of files
    });
    //iterate through the filtered mdoel files
    for(const file of filteredModelFiles){
        const model = require(path.join(__dirname,file)).default(connection); //default calls the init method of the model
        models[model.name] = model; 
    };

    Object.keys(models).forEach(modelName => {
        if (models[modelName].associate) {
          models[modelName].associate(models);
        }
      });
    models.sequelize = connection;
}

export default models;