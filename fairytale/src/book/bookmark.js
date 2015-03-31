var React = require('react');

var CookieService = require('./../services/cookieService');

var Bookmark = React.createClass({
    onClickHandler() {
        var bookmark = CookieService.get('bookmark');
        this.props.onClick(bookmark.chapter);
    },
    render() {
        var bookmark = CookieService.get('bookmark');

        var style = {
            display: 'none',
            width: 224,
            height: 108,
            background: 'url("./fairytale/images/bookmark.png")',
            float: 'right',
            margin: '-7px 25px',
            textAlign: 'center',
        };

        if (bookmark !== null) {
            style.display = 'block';
        }

        var linkStyle = {
            display: 'inline-block',
            width: 78,
            height: 95,
            cursor: 'pointer',
            marginLeft: 7,
        };

        return (
            <div className="Bookmark" style={style}>
                <a style={linkStyle} onClick={this.onClickHandler} />
            </div>
        );
    }
});

module.exports = Bookmark;
