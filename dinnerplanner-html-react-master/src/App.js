import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import ConfirmDinner from "./ConfirmDinner/ConfirmDinner";
import PrintDinner from "./PrintDinner/PrintDinner";
import DishDetails from "./DishDetails/DishDetails";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

	        <div className="jumbotron">
	            <div className="text-center"><h1 className="App-title">{this.state.title}</h1></div>
	        </div>

        </header>
          
          {/* We rended diffrent component based on the path */}
		<Route exact path="/" component={Welcome}/>
		<Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>
		<Route path="/confirmDinner" render={() => <ConfirmDinner model={modelInstance}/>}/>
		<Route path="/printDinner" render={() => <PrintDinner model={modelInstance}/>}/>
    <Route path="/dishDetails/:dishID" render={(props) => (<DishDetails {...props} model={modelInstance} />)}/>
        
      </div>
    );
  }
}

export default App;
