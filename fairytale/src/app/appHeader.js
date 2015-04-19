import React from 'react';

import Bar from './../bar/bar';

const AppHeader = React.createClass({
    render() {
        const style = {
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
                <Bar active={this.props.active} />
            </div>
        );
    }
});

export default AppHeader;