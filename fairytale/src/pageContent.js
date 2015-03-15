var React = require('react');

var PageContent = React.createClass({
    render() {
        var paddingCut = this.props.pagePadding * 2;

        var style = {
            width: this.props.width - paddingCut,
            height: this.props.height - paddingCut,
            overflow: 'hidden',
        };

        var styleScroll = {
            width: '100%',
            height: '100%',
            overflow: 'auto',
            paddingRight: 15,
        };

        return (
            <div className="PageContent" style={style}>
                <div class="PageContent_Scroll" style={styleScroll}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = PageContent;