var React = require('react');

var Style = require('./../services/styleService');

var BarContent = require('./barContent'); 
var BarMenu = require('./barMenu');

var Content = require('./../style/content');
var Clear = require('./../style/clear');

var Bar = React.createClass({
    render() {
        var logoStyle = {
            float: 'left',
            width: 26,
            height: 26,
            borderRadius: 3,
            border: '1px solid ' + Style.colors.title,
            overflow: 'hidden',
        };
        
        return (
            <div className="Bar">
                <Content>
                    <BarContent>
                        <div style={logoStyle}>
                            <img src="./fairytale/images/logo.png" alt="MF" />
                        </div>
                        <BarMenu url={this.props.url} active={this.props.active} />
                        <Clear/>
                    </BarContent>
                </Content>
            </div>
        );
    }
});

module.exports = Bar;