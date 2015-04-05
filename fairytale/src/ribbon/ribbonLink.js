var React = require('react');

var RibbonLink = React.createClass({
    render() {
        var style = {
            display: 'inline-block',
            width: 78,
            height: 95,
            cursor: 'pointer',
            marginLeft: 7,
        };

        return (
            <a title={this.props.title} style={style} onClick={this.props.onClickHandler} />
        );
    }
});

module.exports = RibbonLink;