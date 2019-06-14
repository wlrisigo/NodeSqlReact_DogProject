import React, {Component} from 'react';
import Top from '../components/top.jsx';
import Footer from '../components/footer.jsx';
import NewsComponent from '../components/newsComponent';



export default class News extends Component {

    state = {
        newsArticles: [

        ]
    };

    componentDidMount() {
        fetch('/api/news')
            .then(res => res.json())
            .then(newsArticles => this.setState( { newsArticles } ))
            .then()
            .catch(()=>{
                console.log("Error");
            });


    };
    render() {
        return (
            <React.Fragment>
                <Top/>
                <article className="newsPage">
                    <h2 className={"newsHeader"}>News updates and more!</h2>
                    {console.log(this.state.newsArticles)}
                    <ul>
                        {this.state.newsArticles.map(
                            (article) =>
                            <NewsComponent
                                key={article.pmkNewsId}
                                newsData={article}/>
                        )}
                    </ul>
                </article>
                <Footer/>
            </React.Fragment>
        );
    }
}


