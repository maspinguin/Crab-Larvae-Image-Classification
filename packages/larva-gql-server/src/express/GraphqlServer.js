import config from 'config';
const appConfig = config.get('app');

import { ApolloServer } from 'apollo-server-express';
import { schema } from '../graphql/schema';

export default class GraphQLServer {

    static create() {
        return new ApolloServer({
            schema,
            context: ({ req, res }) => ({
                user: req.user,
                token: req.get('Authorization'),
            }),
            // Initialize engine with your API key
            engine: {
                apiKey: appConfig.apollo,
                origins: [
                    {
                        requestTimeout: '60s',
                    },
                ],
            },
        });

    }

}
