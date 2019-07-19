
import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import RelayService from '../services/RelayService';
import App from './App';

export default class AppLoader extends React.Component{
    render() {
        return(
            <QueryRenderer
                environtment={RelayService.environment}
                render={({err, props}) => {
                    if(err) {
                        return <div>Error:</div>;
                    } else if(props) {
                        return <App viewer={props.viewer}/>
                    }
                    return <div>Loading...</div>
                }}
            >hello</QueryRenderer>
        );
    }
}
