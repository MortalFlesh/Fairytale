import React from 'react';

import ResponsiveService from './../services/responsiveService';

import PageContent from './pageContent';
import Chapter from './../chapter/chapter';

const Page = React.createClass({
    propTypes: {
        background: React.PropTypes.string.isRequired,
        chapter: React.PropTypes.object.isRequired,
    },
    getPageContentSettings() {
        const scrollWidth = 17;
        const maxWidth = 794;
        const maxHeight = 1112;
        let pagePadding = 100;

        let width = ResponsiveService.getWidth(maxWidth);
        const height = ResponsiveService.getHeight(maxHeight);

        const pageRatio = width / maxWidth;
        pagePadding *= pageRatio;
        width += scrollWidth;

        return {
            pagePadding,
            width,
            height,
            scrollWidth,
        };
    },
    render() {
        const pageContentSettings = this.getPageContentSettings();

        const style = {
            padding: pageContentSettings.pagePadding,
            paddingRight: pageContentSettings.pagePadding - pageContentSettings.scrollWidth,
            border: '1px solid black',

            background: `url(${this.props.background})`,
        };

        return (
            <div className="Page" style={style}>
                <PageContent {...pageContentSettings}>
                    <Chapter chapter={this.props.chapter} />
                </PageContent>
            </div>
        );
    }
});

export default Page;
