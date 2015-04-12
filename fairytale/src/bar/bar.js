import React from 'react';

import Style from './../services/styleService';

import BarContent from './barContent';
import BarMenu from './barMenu';

import Content from './../style/content';
import Clear from './../style/clear';

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