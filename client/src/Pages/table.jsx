import React, {Component} from 'react';
import Top from '../components/top';
import Footer from '../components/footer';


/** This page is for displaying all the tables in the DB **/
export default class Tables extends Component {

    state ={
        tblNews: [

        ],
        tblDogs: [

        ],
        tblPeople: [

        ],
        tblTags: [

        ],
        tblDogsTags: [

        ]


    };

    componentDidMount() {

        fetch('/api/news')
            .then(res => res.json())
            .then(tblNews => this.setState( { tblNews } ))

            .catch(()=>{
                console.log("Error");
            });

        fetch('/api/dogs')
            .then(res => res.json())
            .then(tblDogs => this.setState( { tblDogs } ))

            .catch(()=>{
                console.log("Error");
            });

        fetch('/api/person')
            .then(res => res.json())
            .then(tblPeople => this.setState( { tblPeople } ))

            .catch(()=>{
                console.log("Error");
            });

        fetch('/api/tags')
            .then(res => res.json())
            .then(tblTags => this.setState( { tblTags } ))

            .catch(()=>{
                console.log("Error");
            });

        fetch('/api/dogtag')
            .then(res => res.json())
            .then(tblDogsTags => this.setState( { tblDogsTags } ))

            .catch(()=>{
                console.log("Error");
            });
    }





    render() {
        return (
            <React.Fragment>
                <Top/>
                <article>

                    <h2>tbl News</h2>
                    <p>{JSON.stringify(this.state.tblNews)}</p>

                    <h2>tbl Dogs</h2>
                    <p>{JSON.stringify(this.state.tblDogs)}</p>

                    <h2>tbl People</h2>
                    <p>{JSON.stringify(this.state.tblPeople)}</p>

                    <h2>tbl Tags</h2>
                    <p>{JSON.stringify(this.state.tblTags)}</p>

                    <h2>tbl DogsTags</h2>
                    <p>{JSON.stringify(this.state.tblDogsTags)}</p>





                </article>
                <Footer/>


            </React.Fragment>
        );
    }
}