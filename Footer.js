import React from 'react';

class Footer extends React.Component{
    render(){
        return(
            <footer className="product-footer">
                <div className="product-tile">
                    <button className="btn btn-secondary">Customize</button>
                </div>
                <div className="product-tile">
                    <button className="btn btn-primary">Add to Basket</button>
                </div>
            </footer>
        );
    }
}

export default Footer;