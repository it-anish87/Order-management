import express, {Express        } from "express";
import errorsMiddleware from "./middlewares/errors";
import router from "./routes";
import Database from "./database";
import dbConfig from "./config";

export default class App {
  app: Express;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.syncDatabase();
    this.setRoutes();
  }

  async syncDatabase(){
    await new Database(dbConfig).connect();
  }

  setRoutes(){
    this.app.use(errorsMiddleware);
    this.app.use(router);
    this.listen();
  };

  getApp() {
    return this.app;
  }

  listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    this.getApp();
  }
}

new App();
/*
import express from "express";
import dbConfig from "./config";
import Database from "./database"

const port = process.env.PORT || 3000;
const app = express();

(async () => {
    try{
        const db =new Database(dbConfig);
        await db.connect();
    }catch(err){
        console.error(
            'Something went wrong while initializing the server.\n', 
            (err as Error).stack
        )
    }
})();

app.get('/', (req,res) => {
    res.send('!express started!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });


*/
