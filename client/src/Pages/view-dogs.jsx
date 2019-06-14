import React, {Component} from 'react';
import Top from '../components/top';
import Footer from '../components/footer';
import Dog from '../components/dog.jsx'



export default class ViewDogs extends Component {
    state = {
        dogs: [

        ]
    };

    componentDidMount() {
        fetch('/api/dogs/All')
            .then(res => res.json())
            .then(dogs => this.setState( { dogs } ))
            .catch(()=>{
                console.log("Error");
            });
    }

    render() {

        return (
            <React.Fragment>
                <Top/>
                <article className="dogPage">
                    {/*<h2 className={"viewDogsHeader"}>Here are our dogs that we currently have at our shelter</h2>*/}
                    <ul>
                        {this.state.dogs.map(dog =>
                            <Dog
                                key={dog.fldName}
                                dogData={dog}
                            />
                        )}
                    </ul>
                </article>
                <Footer/>
            </React.Fragment>
        );
    }
}


