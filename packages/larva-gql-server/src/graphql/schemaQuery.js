import { GraphQLObjectType, GraphQLString } from  'graphql';
import { viewerType } from "./ViewerType";

const query = new GraphQLObjectType({
    name: 'query',
    fields: {
        viewer: {
            type: viewerType,
            resolve: (_, args, context) => {
                return null
            }
        }
    }
});

export default query;
