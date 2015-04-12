import React from 'react';

import PageContent from './pageContent';

import ResponsiveService from './../services/responsiveService';
import Chapter from './../chapter/chapter';

var Page = React.createClass({
    render() {
        var scrollWidth = 17;
        var pagePadding = 100;
        var maxWidth = 794;
        var maxHeight = 1122;

        var width = ResponsiveService.getWidth(maxWidth);
        var height = ResponsiveService.getHeight(maxHeight);

        var pageRatio = width / maxWidth;
        pagePadding *= pageRatio;
        width += scrollWidth;

        var style = {
            padding: pagePadding,
            paddingRight: pagePadding - scrollWidth,
            border: '1px solid black',

            background: 'url(' + this.props.background + ')',
        };

        return (
            <div className="Page" style={style}>
                <PageContent pagePadding={pagePadding} width={width} height={height} scrollWidth={scrollWidth}>
                    <Chapter chapter={this.props.chapter} />
                </PageContent>
            </div>
        );
    }
});

module.exports = Page;
