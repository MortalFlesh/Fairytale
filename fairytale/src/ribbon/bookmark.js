import React from 'react';

import Cookie from './../services/cookieService';
import Style from './../services/styleService';
import Json from './../services/jsonService';

import RibbonLink from './ribbonLink';

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

        return (
            <div className="Bookmark" style={style}>
                <RibbonLink title="Přejít na uloženou kapitolu" onClickHandler={this.onClickHandler} />
            </div>
        );
    }
});

module.exports = Bookmark;
