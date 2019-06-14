import React, { Component } from 'react';
import './App.css';
import AboutMe from './Pages/about-me.jsx';
import News from './Pages/news.jsx';
import ViewDogs from './Pages/view-dogs';
import {Route,Switch} from 'react-router-dom';
import AddDog from "./Pages/addDog";
import AddUser from "./Pages/addUser";
import Table from "./Pages/table";
import editDog from "./Pages/editDogs";


class App extends Component {
    render() {
        const App = () => (

        <div>
        <Switch>
                <Route exact={true} path={'/'} component={News}/>
                <Route exact={true} path={'/news'} component={News}/>
                <Route exact={true} path={'/AboutUs'} component={AboutMe}/>
                <Route exact={true} path={'/OurDogs'} component={ViewDogs}/>
                <Route exact={true} path={'/addDog'} component={AddDog}/>
            <Route exact={true} path={'/addUser'} component={AddUser}/>
            <Route exact={true} path={'/table'} component={Table}/>
            <Route exact={true} path={'/editDog'} component={editDog}/>


        </Switch>
        </div>
    );
        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}

export default App;
