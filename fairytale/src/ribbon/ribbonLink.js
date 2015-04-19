import React from 'react';

const RibbonLink = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        title: React.PropTypes.string,
    },
    getDefaultProps() {
        return {
            title: '',
        };
    },
    render() {
        const style = {
            display: 'inline-block',
            width: 78,
            height: 95,
            cursor: 'pointer',
            marginLeft: 7,
        };

        return (
            <a title={this.props.title} style={style} onClick={this.props.onClick} />
        );
    }
});

export default RibbonLink;