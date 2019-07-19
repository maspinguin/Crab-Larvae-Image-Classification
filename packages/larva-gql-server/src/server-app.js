import session from 'express-session';

// import express config
import ExpressConfig from './express/ExpressConfig';
import GraphQLServer from './express/GraphQLServer';


// const or variable
const APP_PORT = process.env.PORT || 9090;
const graphqlServer = GraphQLServer.create();

export function startAppServer(callback) {
    const app = ExpressConfig.app();


    // define server and apply it before enforceAuthentication middleware
    graphqlServer.applyMiddleware({
        app,
        path: '/graphql',
        cors: ExpressConfig.corsOptions
    });

    //ERROR HANDLER. MUST BE THE LAST ENTRY
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    return app.listen({
        port: APP_PORT,
    });
}
