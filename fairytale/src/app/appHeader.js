import React from 'react';

import Bar from './../bar/bar';

var AppHeader = React.createClass({
    render() {
        var style = {
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            height: 42,
            width: '100%',
            borderBottom: '1px solid black',
            backgroundColor: '#fdd9ae',
            zIndex: 1000,
        };

        return (
            <div className="AppHeader gradient-background" style={style}>
                <Bar url={this.props.url} active={this.props.active} />
            </div>
        );
    }
});

export default AppHeader;