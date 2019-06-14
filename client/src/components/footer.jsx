import React, {Component} from 'react';

const css = 'App-Footer';
export default class Footer extends Component {
    render() {
        return (
            <React.Fragment>

                <footer className={css}>
                    <p>
                        We thank you so much for your support! Every fostered puppy needs a loving owner!
                    </p>
                </footer>

            </React.Fragment>
        );
    }
}

