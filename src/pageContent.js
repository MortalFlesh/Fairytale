var React = require('react');

var PageContent = React.createClass({
    render() {
        var paddingCut = this.props.pagePadding * 2;

        var style = {
            width: this.props.width - paddingCut,
            height: this.props.height - paddingCut,
            overflow: 'hidden',
        };

        return (
            <div className="PageContent" style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageContent;