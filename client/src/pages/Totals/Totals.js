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
    API.getAllBatches().then(data=>{
      console.log(data)
      data.data.sort(function(a,b){
        return new Date(b.dateMade) - new Date(a.dateMade);
      });
      this.setState({allBatches : data.data})
    })
  }

  exportAll = () =>{
  }
  render() {
    return (
      <div id='totalContainer' className='container'>
      <button className='exportBtn' onClick={this.exportAll}>Export</button>
        {this.state.allBatches.map((el, i)=>{
          return(
            <div key={i} id="allBatches">
              <table>
                <thead>
                  <tr>
                    <th>{el.dateMade}</th>
                    <th>{el.flavor}</th>
                    <th>{el.expDate}</th>
                  </tr>
                </thead>
                <tbody>
                  {el.lots ? el.lots.map((element, index)=>{
                  return(
                    <tr key={index}>
                      <td>{element.ingredient}</td>
                      <td>{element.company}</td>
                      <td>{element.lot}</td>
                    </tr>
                  )}): null}
                </tbody>
              </table>
            </div>
            )}
          )}
      </div>
    );
  }
}

export default Totals;
