import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import gif from '../Images/loading1.gif';
import Sidebar from '../Sidebar/Sidebar';
import { modelInstance } from '../data/DinnerModel';
import './DishDetails.css';

// Alternative to passing the moderl as the component property, 
// we can import the model instance directly


class DishDetails extends Component {
  constructor(props) {
      super(props);
      // We create the state to store the various statuses
      // e.g. API data loading or error 
      this.state = {
        status: 'INITIAL',
        //id: props.match.params.dishID,
        dish: {},
        dishPrice: "",
        guests: "",
      }
      this.addDish = this.addDish.bind(this);
      this.guestChange = this.guestChange.bind(this);
  }

  addDish (evt) {
    modelInstance.addDishToMenu(this.state.dish); 
  }

  guestChange (){
    this.setState({
      dishPrice: Math.round(modelInstance.getNumberOfGuests()*this.state.dish.pricePerServing),
      guests: modelInstance.getNumberOfGuests(),
    })
  }

  componentDidMount = (props) => {
    
    let dishID = this.props.match.params.dishID
    modelInstance.getDish(dishID).then(dish => {

    this.setState({
      status: 'LOADED',
      dish: dish
    })
    this.guestChange()
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  render() {
    let dishName=null;
    let dishPic=null;
    let dishDescription=null;
    let ingredients=null;

    switch (this.state.status) {
      case 'INITIAL':
        dishName = <em><img id="gif2" src={gif} alt="Loading..." /></em>
        break;
      case 'LOADED':
        dishName = this.state.dish.title
        dishPic = this.state.dish.image
        dishDescription = this.state.dish.instructions

        ingredients = this.state.dish.extendedIngredients.map((ingredient) =>
          <tr>
          <td id="td1">{ingredient.name}</td>
          <td id="td2">{Number(ingredient.amount).toFixed(2)}</td>
          <td id="td3">{ingredient.unit}</td>
          </tr>
          )
        break;
      default:
        dishName = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="DishDetails">
        <Sidebar guestChange={this.guestChange} model={this.props.model}/>
        <div className="col-sm-9">
          <h3 className="col-sm-6">{dishName}</h3>
          <Link to="/search">
            <button id="backbutton2" className="btn btn-primary col-sm-3">Back to search</button>
          </Link>
        </div>
        <div className="col-sm-9">
          <div id="descriptionDD" className="col-sm-6">
            <img id="detailpic" src={dishPic} alt="Didn't load"/>
            {dishDescription}
          </div>  
          <div className="col-sm-6">
            <table>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Amount </th>
                <th>Unit </th>
              </tr>
              </thead>
              <tbody>
                {ingredients}
              </tbody>
            </table>
           <h3 className="adddishprice">Dish price : {this.state.dishPrice} SEK for {this.state.guests} people.</h3>
            <Link to="/search">
              <button className="addtomenu" onClick={evt => this.addDish(evt)}>
                <span>Add to Menu</span>
              </button>
            </Link>
          </div>
      </div>
      </div>
    );
  }
}

export default DishDetails;