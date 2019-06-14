import React, {Component} from 'react';


const css = 'newsComponent';

export default class NewsComponent extends Component {

    constructor(props){
        super(props);
        {console.log(props)}
    }


    render() {
        return (
            <article className={css}>
                <h3>{this.props.newsData.fldTitle}</h3>
                <br />
                <p>{this.props.newsData.fldAuthor}</p>
                <p>{this.props.newsData.fldDate}</p>
                <p>{this.props.newsData.fldContent}</p>
            </article>
        );
    }
}


