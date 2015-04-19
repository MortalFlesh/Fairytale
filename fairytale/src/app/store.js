import * as actions from './actions';
import {appCursor} from './../app/state';
import dispatcher from './../lib/dispatcher';
import {List, Record} from 'immutable';

const MenuItemRecord = new Record({
    name: '',
    pathName: '',
    link: '',
});

export const dispatchToken = dispatcher.register(({action, data}) => {
    switch (action) {
        case actions.setAppMenuItems:
            let items = new List();

            data.forEach((item) => {
                items = items.push(new MenuItemRecord(item).toMap());
            });

            appCursor((app) => app.set('menuItems', items));
            break;

    }
});

export const getMenuItems = () => appCursor().get('menuItems');
