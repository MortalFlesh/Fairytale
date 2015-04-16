import jQuery from 'jquery-browserify';

export default {
    scroll(selector, offset, time, scrollable) {
        const element = jQuery(selector);

        let scrollableContainer = 'html, body';
        if (typeof scrollable === 'string' && scrollable.length > 0) {
            scrollableContainer = scrollable;
        }

        if (element.length > 0) {
            jQuery(scrollableContainer).animate({
                scrollTop: element.offset().top + offset
            }, time);
        }
    },
};
