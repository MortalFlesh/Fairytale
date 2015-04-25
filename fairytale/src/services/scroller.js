import jQuery from 'jquery-browserify';

export default {
    scroll(selector, offset, time, scrollable) {
        const element = jQuery(selector);

        let scrollableContainer = 'html, body';
        if (typeof scrollable === 'string' && scrollable.length) {
            scrollableContainer = scrollable;
        }

        if (element.length) {
            jQuery(scrollableContainer).animate({
                scrollTop: element.offset().top + offset
            }, time);
        }
    },
};
