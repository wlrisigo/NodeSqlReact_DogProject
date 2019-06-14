import React, {Component} from 'react';


export default class EditCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ui card">
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button"> Update</div>
                        <div className="ui basic red button"
                             onClick={this.deleteDog.bind(this, this.props.dogId)}> Delete
                        </div>
                    </div>

                </div>

            </div>

        );


    };
};

