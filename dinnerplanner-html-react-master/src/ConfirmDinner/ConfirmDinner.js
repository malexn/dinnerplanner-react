import React, { Component } from 'react';
import './ConfirmDinner.css';
import { Link } from 'react-router-dom';

class ConfirmDinner extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      menu: this.props.model.getFullMenu(),
      totalprice: this.props.model.getTotalMenuPrice(),
      numberOfGuests: this.props.model.getNumberOfGuests()
    }
  }

  componentDidMount() {
    this.props.model.addObserver(this)
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this)
  } 

  update(){
    this.setState({
      totalprice: this.props.model.getTotalMenuPrice(),
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  render() {
    let menuName=null;
    
    menuName = this.state.menu.map((dish) =>
        <tr>
        <td>{dish.title}<img id="dishpic" src={dish.image} alt="Didn't load.."/></td>
        <td>{Math.round(dish.pricePerServing)}</td>
        </tr>
        )

    return (
      <div className="ConfirmDinner">
        <h2>An overview of your dinner</h2>
        
        <Link to="/printDinner">
            <button id="toprint" className="btn btn-primary right-block">Print Dinner</button>
        </Link>
        
        <Link to="/search">
            <button id="backtosearch1" className="btn btn-primary left-block">Back to search</button>
        </Link>
        
        <h4>Number of guest: {this.state.numberOfGuests}</h4>
        
        <table>
          <thead>
            <tr>
              <th>Dish</th>
              <th>Price per person</th>
            </tr>
          </thead>
          <tbody>
            {menuName}
          </tbody>
        </table>
        <h4 className="totalmenupriceCD">Total menu Price: {this.state.totalprice}</h4>
      </div>
    );
  }
}

export default ConfirmDinner;