var React = require('react');
var RouterMixin = require('react-mini-router').RouterMixin;

var AppHeader = require('./appHeader');
var AppContent = require('./appContent');

var Book = require('./../book/book');
var Content = require('./../content');
var Characters = require('./../characters');

var App = React.createClass({
    mixins: [RouterMixin],
    routes: {
        '/': 'book',
        '/characters/': 'characters',
        '/character/:name': 'character',
    },
    getActive() {
        var path = this.state.path;

        if (path.indexOf('/character') === 0) {
            return 'characters';
        } else {
            return 'book';
        }
    },
    book() {
        return <Book url={"./api/api.php"} interval={60 * 1000} />;
    },
    characters() {
        return <Characters url={"./api/api.php?action=characters"} />;
    },
    character(name) {
        return <Characters url={"./api/api.php?action=characters"} selected={name} />;
    },
    notFound(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
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

module.exports = App;