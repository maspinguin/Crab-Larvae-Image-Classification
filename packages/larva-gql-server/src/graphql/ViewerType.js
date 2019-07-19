import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

let viewerType = new GraphQLObjectType({
    name: 'Viewer',
    fields: {
        id: {
            type: GraphQLString
        }
    }
});


export {
    viewerType
};
