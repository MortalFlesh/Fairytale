var React = require('react');

var Header = React.createClass({
    render() {
        var style = {
            borderBottom: '1px solid black',
        };

        return (
            <div className="Header" style={style}>
                <h1 style={{textAlign: 'center'}}>
                    {this.props.title}
                </h1>
                <h2 style={{textAlign: 'center'}}>
                    {this.props.subTitle}
                </h2>
            </div>
        );
    }
});

module.exports = Header;