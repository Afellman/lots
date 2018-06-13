import React, {Component} from 'react';
import API from '../../utils/ajax';
import data from '../../utils/data';
import styles from './Batches.css';

class Batches extends Component {
  state = {
    batches: []
  }
  componentWillMount() {
    API.getTenBatches().then((res)=>{
      console.log(res)
      // console.log(res.data[0]['baba']['chickpea']['ingredient'])
      let batches = res.data
      this.setState({batches: batches})
    })

  }
  render() {
    return (
      <div>
        {/* {this.state.batches.length > 0 ? 
        <h1>{this.state.batches[0]['baba']['chickpea']['ingredient']}</h1>
        : null } */}
        <button className='get-batches'>Get More</button>
      </div>
    )
  }
}

export default Batches;