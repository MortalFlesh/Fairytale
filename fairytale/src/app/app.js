import React from 'react';
import {RouterMixin} from 'react-mini-router';

import {state, reloadState} from './state';
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
    defaultProps() {
        return {
            interval: 60 * 1000,
        }
    },
    componentWillMount() {
        this.reloadApp();
    },
    componentDidMount() {
        state.on('change', () => {
            this.forceUpdate();
        });

        setInterval(this.reloadApp, this.props.interval);
    },
    reloadApp() {
        reloadState('./api/api.php?action=book', 'book');
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
        return <Book
            url={"./api/api.php?action=book"}
            rollForNewChaptersUrl={"./api/api.php?action=roll-for-new-chapters"}
            interval={60 * 1000} />;
    },
    characters() {
        return <Characters url={"./api/api.php?action=characters"} />;
    },
    character(name) {
        return <Characters url={"./api/api.php?action=characters"} selected={name} />;
    },
    notFound(path) {
        return <div className="not-found">Page Not Found: {path}</div>;
    },
    render() {
        return (
            <div className="App">
                <AppHeader url={"./api/api.php?action=menu-items"} active={this.getActive()} />
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
