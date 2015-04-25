import React from 'react';

const PageContent = React.createClass({
    propTypes: {
        pagePadding: React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        scrollWidth: React.PropTypes.number.isRequired,
        children: React.PropTypes.element.isRequired,
    },
    render() {
        const chapterParagraphPadding = 12;

        const paddingCut = this.props.pagePadding * 2 - chapterParagraphPadding;

        const style = {
            content: {
                width: this.props.width - paddingCut,
                height: this.props.height - paddingCut,
                overflow: 'hidden',
            },
            scrollable: {
                width: '100%',
                height: '100%',
                overflow: 'auto',
                paddingRight: this.props.scrollWidth,
            }
        };

        return (
            <div className="PageContent" style={style.content}>
                <div className="PageContent_Scroll" style={style.scrollable}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default PageContent;
