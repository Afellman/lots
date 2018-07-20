import React, { Component } from 'react';
import data from '../../utils/data'
import styles from './FlavorList.css'



class FlavorList extends Component {
  // -- Setting the state
  
  state = {
    }


  render() {
    return (
      <div id='flavor-list'>
        {data.flavorsWithIngredients.map((flavor)=> {
          return (
          <div className='ghost'>
            <button
              onClick={this.props.batchChosen}
              className='btn btn-primary flavor-btn'
              data-object={JSON.stringify(flavor)}
              >
              {Object.keys(flavor)}
            </button>
            </div>
          )
        })}
      </div>
    );
  }
}

export default FlavorList;
  
