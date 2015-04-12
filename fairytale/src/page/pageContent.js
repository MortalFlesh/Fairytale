import React from 'react';

var PageContent = React.createClass({
    render() {
        var chapterParagraphPadding = 12;

        var paddingCut = this.props.pagePadding * 2 - chapterParagraphPadding;

        var style = {
            width: this.props.width - paddingCut,
            height: this.props.height - paddingCut,
            overflow: 'hidden',
        };

        var styleScroll = {
            width: '100%',
            height: '100%',
            overflow: 'auto',
            paddingRight: this.props.scrollWidth,
        };

        return (
            <div className="PageContent" style={style}>
                <div className="PageContent_Scroll" style={styleScroll}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = PageContent;
