import Cookies from './../services/cookieService';
import dispatcher from './../lib/dispatcher';
import * as chapterActions from './../chapter/actions';
import * as ribbonActions from './../ribbon/actions';

export const dispatchToken = dispatcher.register(({action, data}) => {
    switch(action) {
        case chapterActions.setBookmark:
            Cookies.set('bookmark', data);
            break;

        case ribbonActions.diceRoll:
            const hours = 20;
            Cookie.set('dice-rolled', {roll: data}, hours);
            break;
    }
});

export function getBookmark() {
    return Cookies.get('bookmark');
}

export function getDiceRoll() {
    return Cookies.get('dice-rolled');
}
