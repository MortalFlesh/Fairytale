import React from 'react';

import Content from './../style/content';

const AppContent = React.createClass({
    render() {
        const style = {
            marginTop: 43,
        };

        return (
            <div className="AppContent" style={style}>
                <Content>
                    {this.props.children}
                </Content>
            </div>
        );
    }
});

export default AppContent;