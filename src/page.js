var React = require('react');

var ResponsiveService = require('./services/responsiveService');

var Chapter = require('./chapter');

var Page = React.createClass({
    render() {
        var pagePadding = 100;
        var maxWidth = 794;
        var maxHeight = 1122;

        var width = ResponsiveService.getWidth(maxWidth);
        var height = ResponsiveService.getHeight(maxHeight);

        var pageRatio = width / maxWidth;
        pagePadding *= pageRatio;

        var style={
            padding: pagePadding,
            border: '1px solid black',

            background: 'url(' + this.props.background + ')',
        };

        var contentStyle = {
            width: width - pagePadding * 2,
            height: height - pagePadding * 2,
            overflow: 'hidden',
        };

        return (
            <div className="Page" style={style}>
                <div class="PageContent" style={contentStyle}>
                    <Chapter data={this.props.chapter} />
                </div>
            </div>
        );
    }
});

module.exports = Page;