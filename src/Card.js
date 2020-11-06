import React from 'react';
import { withLDConsumer } from 'launchdarkly-react-client-sdk';
import Footer from './Footer';
import './App.css';

class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            product: null
        };
        this.activateLink = this.activateLink.bind(this);
    }

    async componentDidMount(){
        const url = "http://localhost:8080/api";
        const response = await fetch(url);
        const userInfo = await response.json();
        this.setState({
            loading: false, 
            product: userInfo
        });
        
    }

    activateLink(){
        const fcp = window.performance.getEntriesByName("first-contentful-paint")[0].startTime;
        const fcpOutput = parseFloat(fcp.toFixed(2) / 1000);
        this.props.ldClient.track("First Contentful Paint", null, fcpOutput);
        console.log(
            "%c First Contentful Paint: " + fcpOutput.toFixed(4) + " Seconds",
            "font-size: 15px; color: red;"
        );
        console.log(
            "%c Click Event Fired.", 
            "font-size: 15px; color: yellow;"
            );
        return false;

    };

render() {
    return this.state.loading ? <li> loading... </li> : 
        this.state.product.map(user => (
    <li className="card" key={user.id}>
            <div>
                    <a className="linky" href="#" onClick={this.activateLink}>
                    <img src={user.image} />
                </a>
            </div>
            <div className="name">{user.name}</div>
            <div className="size">{user.size}</div>
        <Footer />
        </li>
        ));
}
}

export default withLDConsumer()(Card);