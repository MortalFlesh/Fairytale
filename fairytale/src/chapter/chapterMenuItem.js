var React = require('react');

var Style = require('./../services/styleService');

var ChapterMenuItem = React.createClass({
    handleOnClick() {
        this.props.onClickHandler(this.props.number);
    },
    render() {
        var style = {
            display: 'inline-block',
            margin: '0 8px',
            cursor: 'pointer',
            color: Style.colors.title,
            textShadow: Style.shadow.title,
        };

        if (this.props.isActive) {
            style.color = Style.colors.titleActive;
            style.textDecoration = 'underline';
        }

        return (
            <div className="ChapterMenuItem" style={style} onClick={this.handleOnClick}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ChapterMenuItem;