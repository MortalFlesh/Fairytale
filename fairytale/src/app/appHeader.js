var React = require('react');

var AppHeaderContent = require('./appHeaderContent');
var Content = require('./../content');
var Clear = require('./../style/clear');

var AppHeader = React.createClass({
    render() {
        var style = {
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            height: 42,
            width: '100%',
            borderBottom: '1px solid black',
            backgroundColor: '#fdd9ae',
            zIndex: 1000,
        };

        var logoStyle = {
            float: 'left',
            width: 26,
            height: 26,
            borderRadius: 3,
            border: '1px solid black',
            overflow: 'hidden',
        };

        var menuStyle = {
            float: 'right',
        };

        return (
            <div className="AppHeader gradient-background" style={style}>
                <Content>
                    <AppHeaderContent>
                        <div style={logoStyle}>
                            Logo
                        </div>
                        <div style={menuStyle}>
                            ...header (active: {this.props.active})...
                        </div>
                        <Clear/>
                    </AppHeaderContent>
                </Content>
            </div>
        );
    }
});

module.exports = AppHeader;