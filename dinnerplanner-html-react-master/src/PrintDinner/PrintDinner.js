import React, { Component } from 'react';
import './PrintDinner.css';
import { Link } from 'react-router-dom';

class PrintDinner extends Component {

  constructor(props)  {
    super(props)
    this.state = {
      menu: this.props.model.getFullMenu(),
    }
  }  

  render() {
    let menuPrint=null;
    let ingredient=null;


    menuPrint = this.state.menu.map((dish) =>
      <tr key={dish.id}>
      <td>{dish.title}<img id="dishpic" src={dish.image} alt="Didn't load.."/></td>
      <td>{dish.instructions}</td>
      
    {dish.extendedIngredients.map((ingredient) =>
      <tr>
      <td id="td1">{ingredient.name}</td>
      <td id="td2">{Number(ingredient.amount).toFixed(2)}</td>
      <td id="td3">{ingredient.unit}</td>
      </tr>)}
      </tr>
      )

    return (
      <div className="PrintDinner">
        
        <Link to="/confirmDinner">
          <button id="backtoconfirm" className="btn btn-primary left-block">Back to Confirm Dinner</button>
        </Link>
        
        <button id="printbutton" className="btn btn-primary right-block">Print</button>
        
        <Link to="/search">
          <button id="backtosearch" className="btn btn-primary">Back to search</button>
        </Link>
        
        <table>
          <thead>
            <tr>
              <th className="col-sm-3">Dish</th>
              <th className="col-sm-6">Instructions</th>
                <tr>
                  <th id="th1" className="col-sm-1">Ingredients</th>
                  <th id="th2" className="col-sm-1">Amount</th>
                  <th id="th3" className="col-sm-1">Unit</th>
                </tr>
            </tr>
          </thead>
          <tbody>
            {menuPrint}
            {ingredient}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PrintDinner;