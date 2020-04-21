import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { withLDProvider } from 'launchdarkly-react-client-sdk';
import Card from './Card';  

require('dotenv').config();

class App extends Component {
    render() {
        return (
            <div className="App">
                <ul><Card /></ul>
            </div>
        )
    }
}

export default withLDProvider({
    clientSideID: "5d4783b7b5c51906f0768c14",
    user:{
    //key: "user" + Math.floor(Math.random() * 90000000) + 10000,
    key: "sherron@launchdarkly.com",
    firstName: "Simon",
    lastName: "Herron",
    country: "UK",
    city: "London",
    ip: "127.0.0.1",
    email: "sherron@launchdarkly.com",
    privateAttributeNames: ["email", "MRR"],
    custom: {
        groups: ["Beta", "Internal", "High Volume"],
        networkConnection: "4g",
        loyaltyMember: false,
        requestTime: Math.round(new Date().getTime() / 1000),
        LTV: "Z142456"
    },
    reactOptions: {
        useCamelCaseFlagKeys: true,
    }
}
})(App);