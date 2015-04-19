import React from 'react';

const AppContent = React.createClass({
    render() {
        const style = {
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