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
        };

        if (this.props.isActive) {
            style.color = 'blue';
        }

        return (
            <div className="ChapterMenuItem" style={style} onClick={this.handleOnClick}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ChapterMenuItem;