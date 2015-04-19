import React from 'react';
import {RouterMixin} from 'react-mini-router';

import * as state from './state';
import AppHeader from './appHeader';
import AppContent from './appContent';

import Content from './../style/content';
import Book from './../book/book';
import Characters from './../character/characters';

const App = React.createClass({
    mixins: [RouterMixin],
    routes: {
        '/': 'book',
        '/characters/': 'characters',
        '/character/:name': 'character',
    },
    getDefaultProps() {
        return {
            interval: 60 * 1000,
        }
    },
    componentDidMount() {
        state.state.on('change', () => {
            this.forceUpdate();
        });

        this.reloadApp();
        setInterval(this.reloadApp, this.props.interval);
    },
    reloadApp() {
        state.reloadBook('./api/api.php?action=book');
        state.reloadCharacters('./api/api.php?action=characters');
        state.reloadAppHeader("./api/api.php?action=menu-items");
    },
    getActive() {
        const path = this.state.path;

        if (path.indexOf('/character') === 0) {
            return 'characters';
        } else {
            return 'book';
        }
    },
    book() {
        return <Book rollForNewChaptersUrl={"./api/api.php?action=roll-for-new-chapters"} />;
    },
    characters() {
        return <Characters/>;
    },
    character(name) {
        return <Characters selected={name} />;
    },
    notFound(path) {
        return <div className="not-found">Page Not Found: {path}</div>;
    },
    render() {
        return (
            <div className="App">
                <AppHeader active={this.getActive()} />
                <AppContent>
                    <Content>
                        {this.renderCurrentRoute()}
                    </Content>
                </AppContent>
            </div>
        )
    }
});

export default App;
