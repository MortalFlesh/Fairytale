var React = require('react');

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
            border: '1px solid black',
            overflow: 'hidden',
        };
        
        return (
            <div className="Bar">
                <Content>
                    <BarContent>
                        <div style={logoStyle}>
                            Logo
                        </div>
                        <BarMenu active={this.props.active} />
                        <Clear/>
                    </BarContent>
                </Content>
            </div>
        );
    }
});

module.exports = Bar;