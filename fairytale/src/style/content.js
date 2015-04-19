import React from 'react';

const Content = React.createClass({
    render() {
        const style = {
            maxWidth: 800,
            margin: '0 auto',
        };

        return (
            <div className="Content" style={style}>
                {this.props.children}
            </div>
        );
    }
});

export default Content;