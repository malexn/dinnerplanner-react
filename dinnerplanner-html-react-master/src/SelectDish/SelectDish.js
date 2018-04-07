import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';


class SelectDish extends Component {
  constructor(props) {
    super();
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      filter: '',
      type: 'all'
    }

    this.typeChanged = this.typeChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleSubmit (evt) {
    evt.preventDefault();
    console.log(this.refs.filterInput.value);
    this.setState({
      filter: this.refs.filterInput.value
    });
    // setState kanske? Behövs egentligen inte, kanske skicka vidare till
  }

  
  typeChanged (evt) {
    this.setState({
      type: evt.target.value
    });
  }

  static defaultProps = {
    categories: ['all', 'appetizer', 'beverage', 'bread', 'breakfast', 'dessert','main course', 'salad', 'sauce', 'side dish','soup']

  }
  
  render() {
    let categoryOptions = this.props.categories.map(category =>{
      return <option key={category} value={category}>{category}</option>
    })

    return (
      <div className="SelectDish">
        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model}/>

        <form id="search" onSubmit={this.handleSubmit}>

          <input id="searchinput" ref="filterInput" type="text" placeholder="Find out if we got what you're looking for"/>
          
          <select id="category" ref="category" className="btn btn-primary" onChange={evt => this.typeChanged(evt)}>
            {categoryOptions}
          </select>

          <button id="searchbutton" type="submit" className="btn btn-primary">Search</button>
        </form>

        <Dishes filter={this.state.filter} type={this.state.type} />
        
      </div>
    );
  }
}

export default SelectDish;
