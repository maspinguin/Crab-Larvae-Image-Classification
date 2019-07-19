import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export default class ExpressConfig {

    static corsOptions = {
        origin: true,
        credentials: true,
        optionsSuccessStatus: 200,
    };

    static app() {
        let app = express();
        // app.use(cors(ExpressConfig.corsOptions));
        app.set('trust proxy', 1); // trust first proxy for AWS Elasticbeanstalk / AWS ELB
        app.use(bodyParser.urlencoded({ extended: true })); //avoid missing credentials issue http://stackoverflow.com/questions/17074375/passport-authentication-failed-in-basic-example
        app.use(bodyParser.json({ limit: '1mb' }));
        app.use(bodyParser.text({}));
        return app;
    }
}
