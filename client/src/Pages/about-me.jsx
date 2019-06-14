import React, {Component} from 'react';
import Top from '../components/top';
import Footer from '../components/footer';
import Shelter from '../AnimalShelter.jpg';


const css = 'About-Me';


export default class AboutMe extends Component {
    render() {
        return <React.Fragment>

            <Top />
            <article className={css}>
                <h2>About us: Vermont Shelter</h2>

                <p>
                    Vermont Shelter is a community of people working hard everyday
                    to ensure homeless dogs and puppies have a place to stay. We strive to give
                    every lost puppy a home.

                    If you are interested in adopting one of our dogs, please visit the 'View our Dogs'
                    page to looks at what dogs we have at our shelter. (Coming Soon) If you would like more information
                    about a dog, select the 'Request info' button, and enter your email address.
                </p>

                <figure>
                    <img src={Shelter}/>
                    <figcaption>Adpot a rescue today!</figcaption>
                </figure>
            </article>
            <Footer/>

        </React.Fragment>;
    }
}