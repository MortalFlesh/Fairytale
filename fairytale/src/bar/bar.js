import React from 'react';
import {addons} from 'react/addons';

import Style from './../services/styleService';

import BarContent from './barContent';
import BarMenu from './barMenu';
import Content from './../style/content';
import Clear from './../style/clear';

const Bar = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        active: React.PropTypes.string.isRequired,
        menuItems: React.PropTypes.array.isRequired,
    },
    render() {
        const logoStyle = {
            float: 'left',
            width: 26,
            height: 26,
            borderRadius: 3,
            border: `1px solid ${Style.colors.title}`,
            overflow: 'hidden',
        };
        
        return (
            <div className="Bar">
                <Content>
                    <BarContent>
                        <div style={logoStyle}>
                            <img src="./fairytale/images/logo.png" alt="MF" />
                        </div>

                        <BarMenu {...this.props}/>

                        <Clear/>
                    </BarContent>
                </Content>
            </div>
        );
    }
});

export default Bar;