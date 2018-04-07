import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/DinnerModel';
class Sidebar extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getFullMenu(),
      menuPrice: this.props.model.getTotalMenuPrice()
    }
    this.deleteDish = this.deleteDish.bind(this);
  }

  deleteDish(dish){
    modelInstance.removeDishFromMenu(dish);
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getFullMenu(),
      menuPrice: this.props.model.getTotalMenuPrice()
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

render() {
    let menuName=null;
    menuName = this.state.menu.map((dish) =>
      <tr key={dish.id}>
      <td>{dish.title}</td>
      <td>{Math.round(dish.pricePerServing*this.state.numberOfGuests)}</td>
      <td>{<button onClick={evt => this.deleteDish(dish)}>Delete dish</button>}</td>
      </tr>
      )

    function onPlusClicked (){
      this.props.model.setNumberOfGuests(this.props.model.getNumberOfGuests()+1)
      
      if(this.props.guestChange){
        this.props.guestChange()
      }
    }

    function onMinusClicked (){
      if(this.state.numberOfGuests > 1){
        this.props.model.setNumberOfGuests(this.props.model.getNumberOfGuests()-1)
      }
      if(this.props.guestChange){
        this.props.guestChange()
      }
    }

    return (
      <div className="col-sm-3">
        <div className="Sidebar">
          <h3>My Dinner</h3>
          <p>
          Number of people: <input id="peopleinput" className="btn btn-primary" value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged} readOnly/>
          <button id="plusbutton" className="btn btn-primary glyphicon glyphicon-plus" onClick={onPlusClicked.bind(this)}></button>
          <button id="minusbutton" className="btn btn-primary glyphicon glyphicon-minus" onClick={onMinusClicked.bind(this)}></button>
          </p>
          <table>
            <thead>
              <tr>
                <th>Dish</th>
                <th>Cost</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
                {menuName}
              </tbody>
          </table>  
          <div className="col-sm-12">
            <h4 id="totalpriceSB">Total menu price: {this.props.model.getTotalMenuPrice()}</h4>
          </div>
          <Link to="/confirmDinner">
              <button id="confirmbutton" className="btn btn-primary">Confirm dinner</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;
