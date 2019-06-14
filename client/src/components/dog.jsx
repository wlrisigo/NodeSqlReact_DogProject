import React, {Component} from 'react';


const css = "dogInfo";
export default class Dog extends Component {

    constructor(props){
        super(props);
    }

    deleteDog(Dog){
        fetch('/api/dogs/delete/' +  Dog, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: Dog})
        })
            .then(res => res.text())
            .then(res => alert(res))
            .then(window.location.reload());
    }

    render() {
        return (
            <React.Fragment>

                <li className='dogRow'>
                    <article  className = 'dogPhotoC'>
                        <figure className='dogPhotoFrame'>
                        <img className = 'dogPhoto' src={require('../'+ this.props.dogData.fldPhoto)}/>
                            <figcaption className={css}>{this.props.dogData.fldName}</figcaption>
                          <span>  <button onClick={this.deleteDog.bind(this, this.props.dogData.pmkDogs)}>
                                Delete Dog
                          </button>  </span>
                        </figure>
                    </article>
                    {/*Displaying dog Age, Breed, Description, Status*/}
                    <article className='dogInfoC'>
                        <p className={css} width="100%">Age: {this.props.dogData.fldAge}</p>
                        <br/>
                        <p className={css}>Breed: {this.props.dogData.fldBreed}</p>
                        <br/>
                        <p className={css}>Description: {this.props.dogData.fldDescription}</p>
                        <br/>
                        <p className={css}>Status: {this.props.dogData.fldStatus}</p>
                    </article>
                </li>
            </React.Fragment>
        );
    }
}

