import React, {Component} from 'react';
import API from '../../utils/ajax';
import styles from './Totals.css';
import data from '../../utils/data';
import { Link } from 'react-router-dom'


class Totals extends Component {

  state = {
   allBatches : [] 
  }

  componentWillMount(){
    API.getAllBatches(data =>{
      console.log(data)
      this.setState({allBatches : data})
    })
  }

  render() {
    return (
      <div id='totalContainer' className='container'>
        Totals
      </div>
    );
  }
}

export default Totals;
