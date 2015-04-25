import React from 'react';

import PageContent from './pageContent';

import ResponsiveService from './../services/responsiveService';
import Chapter from './../chapter/chapter';

const Page = React.createClass({
    propTypes: {
        background: React.PropTypes.string.isRequired,
        chapter: React.PropTypes.object.isRequired,
    },
    render() {
        const scrollWidth = 17;
        const maxWidth = 794;
        const maxHeight = 1122;
        let pagePadding = 100;

        let width = ResponsiveService.getWidth(maxWidth);
        const height = ResponsiveService.getHeight(maxHeight);

        const pageRatio = width / maxWidth;
        pagePadding *= pageRatio;
        width += scrollWidth;

        const style = {
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

export default Page;
