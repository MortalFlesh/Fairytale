var React = require('react');
var jQuery = require('jquery-browserify');

var Chapter = require('./chapter');

var Book = React.createClass({
    getInitialState() {
        return {
            book: {
                title: '',
                subTitle: '',
                cover: '',
                background: '',
                chapters: [],
            }
        }
    },
    loadBook() {
        jQuery.ajax({
            url: this.props.url,
            dataType: 'json',
        })
            .done(function (data) {
                this.setState({book: data});
            }.bind(this));
    },
    componentDidMount() {
        this.loadBook();
    },
    render() {
        var book = this.state.book;
        var chapters = book.chapters.map(function(chapter){
            return <Chapter data={chapter} />
        });

        var style = {
            book: {
                width: 800,
                margin: '0 auto',
            },
            header: {
                borderBottom: '1px solid black'
            }
        };

        return (
            <div className="Book" style={style.book}>
                <div className="Header" style={style.header}>
                    <h1 style={{textAlign: 'center'}}>
                        {book.title}
                    </h1>
                    <h2 style={{textAlign: 'center'}}>
                        {book.subTitle}
                    </h2>
                </div>

                <div className="Chapters">
                    {chapters}
                </div>
            </div>
        );
    }
});

module.exports = Book;