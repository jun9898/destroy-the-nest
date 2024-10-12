import express from 'express';
import morgan from 'morgan';
import {AppDataSource} from "./data-source";
import {UserRouter} from "./router/user.router";

const app = express();

AppDataSource.initialize()
    .then(() =>  {
        console.log('Database connected');
    }).catch((err) => {
        console.error(err);
    });

app.use(express.json());
app.use(morgan('dev'));

app.use('/users', UserRouter)

const port = 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});