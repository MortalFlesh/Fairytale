var React = require('react');

var BookHeader = React.createClass({
    render() {
        var style = {
            header: {
                padding: '20px 0',
                borderBottom: '1px solid black',
            },
            title: {
                textAlign: 'center',
                color: '#fdd9ae',
                fontSize: 50,
                textShadow: '-1px -1px 1px #000, 1px -1px 1px #000,-1px 1px 1px #000,1px 1px 1px #000',
                margin: 0,
            },
            subTitle: {
                textAlign: 'center',
                color: '#fdd9ae',
                fontSize: 30,
                textShadow: '-1px -1px 1px #000, 1px -1px 1px #000,-1px 1px 1px #000,1px 1px 1px #000',
                margin: 0,
            },
        };

        return (
            <div className="BookHeader" style={style.header}>
                <h1 style={style.title}>
                    {this.props.title}
                </h1>
                <h2 style={style.subTitle}>
                    {this.props.subTitle}
                </h2>
            </div>
        );
    }
});

module.exports = BookHeader;