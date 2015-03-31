var React = require('react');

var CookiesService = require('./../services/cookieService');

var ChapterParagraph = React.createClass({
    getInitialState() {
        return {
            hover: false,
        };
    },
    repairContent(rawContent) {
        return rawContent.split('@').map(part => {
            var firstLetter = part[0];

            if (firstLetter === '#') {
                return <strong>{part.substring(1)}</strong>
            } else if (firstLetter === '*') {
                return <em>{part.substring(1)}</em>
            } else if (firstLetter === '~' || rawContent.length < 2) {
                return <br />
            } else {
                return part;
            }
        });
    },
    mouseEnterHandler(event) {
        this.setState({hover: true});
    },
    mouseLeaveHandler(event) {
        this.setState({hover: false});
    },
    onClickHandler() {
        CookiesService.set('bookmark', {
            chapter: parseInt(this.props.paragraph.chapter),
            paragraph: parseInt(this.props.paragraph.id),
        });
    },
    render() {
        var bgColor = 'none';

        if (this.props.paragraph.isNew == '1') {
            bgColor = 'RGBA(0,255,0, 0.15)';
        }

        var style = {
            background: bgColor,
            lineHeight: '20px',
            textIndent: 30,
            textAlign: 'justify',
            padding: 5,
            border: '1px solid',
            borderColor: 'transparent',
            borderRadius: 5,
            cursor: 'alias',
        };

        if (this.state.hover) {
            style.borderColor = 'black';
        }

        var content = this.repairContent(this.props.children);

        return (
            <p className="ChapterParagraph"
               title="Přidat záložku"
               style={style}
               onMouseEnter={this.mouseEnterHandler}
               onMouseLeave={this.mouseLeaveHandler}
               onClick={this.onClickHandler}
            >
                {content}
            </p>
        );
    }
});

module.exports = ChapterParagraph;