var React = require('react');

var $ = require('jquery-browserify');

var Chapter = React.createClass({
    render() {
        var data = this.props.data;
        var style = {
            lineHeight: '20px'
        };

        var paragraphs = data.paragraphs.map(function(paragraph){
            var paragraphStyle = $.extend(true, {}, style);
            if (paragraph.isNew == '1') {
                paragraphStyle.background = 'green';
            } else {
                paragraphStyle.background = 'white';
            }

            return (
                <p style={paragraphStyle}>
                    {paragraph.content}
                </p>
            )
        });

        return (
            <div className="Chapter" style={{paddingTop: 20}}>
                <h3 style={{textAlign: 'center'}}>
                    <strong>{data.chapter.number}.</strong>{' ' + data.chapter.title}
                </h3>

                {paragraphs}
            </div>
        );
    }
});

module.exports = Chapter;