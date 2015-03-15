var React = require('react');

var ChapterMenuItem = React.createClass({
    handleOnClick() {
        this.props.onClickHandler(this.props.number);
    },
    render() {
        var style = {
            display: 'inline-block',
            margin: '0 10px',
            cursor: 'pointer',
            color: '#956722',
            textShadow: '-1px -1px 1px #000, 1px -1px 1px #000,-1px 1px 1px #000,1px 1px 1px #000',
        };

        if (this.props.isActive) {
            style.color = '#fdd9ae';
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