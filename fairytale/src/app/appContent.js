import React from 'react';

var AppContent = React.createClass({
    render() {
        var style = {
            marginTop: 43,
        };

        return (
            <div className="AppContent" style={style}>
                {this.props.children}
            </div>
        );
    }
});

export default AppContent;