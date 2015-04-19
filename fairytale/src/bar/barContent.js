import React from 'react';

const BarContent = React.createClass({
    render() {
        const style = {
            padding: '8px 0',
        };

        return (
            <div className="BarContent" style={style}>
                {this.props.children}
            </div>
        );
    }
});

export default BarContent;