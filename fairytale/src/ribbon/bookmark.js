var React = require('react');

var Cookie = require('./../services/cookieService');
var Style = require('./../services/styleService');
var Json = require('./../services/jsonService');

var Bookmark = React.createClass({
    onClickHandler() {
        var bookmark = Cookie.get('bookmark');
        this.props.onClick(bookmark.chapter);
    },
    render() {
        var bookmark = Cookie.get('bookmark');

        var style = Json.extendsJson(Style.ribbonCommonStyle, {
            backgroundImage: 'url("./fairytale/images/bookmark.png")',
            display: 'none',
            width: 100,
        });

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
                <a title="Přejít na uloženou kapitolu" style={linkStyle} onClick={this.onClickHandler} />
            </div>
        );
    }
});

module.exports = Bookmark;
