import React from 'react';

const Content = React.createClass({
    propTypes: {
        children: React.PropTypes.element.isRequired,
    },
    render() {
        const style = {
            maxWidth: 798,
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