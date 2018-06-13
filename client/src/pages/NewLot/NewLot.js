import React, {Component} from 'react';
import API from '../../utils/ajax';
import styles from './NewLot.css';
import data from '../../utils/data';
import { Link } from 'react-router-dom'


// ** Need to change so that there is only one save button for either a new lot **
// ** a new company or both ** 
class NewLot extends Component {
  // -- Setting the state

  state = {
    showInput: false,
    currentLot: {},
    companyInput: '',
    companyLotInput: '',
    lotInput: '',
    currentLotFull: {},
    ingredient: ''
  }

  showLotInput = (e) => {
    let ingredient = e.target.innerText
    API
      .getLot(ingredient)
      .then((res) => {
        console.log(res.data[0])
        this.setState({currentLot: res.data[0]})
      })
    this.setState({showInput: true, ingredient: ingredient})
  }

  processNewLot = () =>{
    if (this.state.lotInput.length < 3) {
      alert('Not Long Enough')
      this.setState({lotInput: ''})
    } else {
      let newLotObj = {
        ingredient: this.state.ingredient,
        lot: this.state.lotInput,
        company: this.state.currentLot.company
      }
      console.log(newLotObj)
      API.newLot(newLotObj)
    }
  }

  processNewCompany = () =>{
    if (this.state.companyInput.length < 3) {
      alert('Not Long Enough')
      this.setState({companyLotInput: '', companyInput: ''})
    } else {
      let newCompanyObj = {
        ingredient: this.state.ingredient,
        lot: this.state.companyLotInput,
        company: this.state.companyInput
      }
      API.newCompany(newCompanyObj)
    }
  }

  processInput = (e) =>{
    let id = e.target.id
    console.log(id)
    this.setState({[id] : e.target.value})
  }

  render() {
    return (
      <div id='new-lot'>
        {this.state.showInput
          ? <div>
              <button className='back-button' to='/newLot' onClick={()=>this.setState({showInput: false, companyInput: '', lotInput: '', companyLotInput: ''})}>&lt;</button>
              <h1> Current Lot =  {this.state.currentLot.lot} </h1>
              <h1> Current Company =  {this.state.currentLot.company} </h1>
              <div id='new-lot-div'>
                <span style={{textAlign: 'center', marginLeft: '50px'}}>New Lot, Same Company</span>
                <input placeholder='Lot Number' value={this.state.lotInput} id='lotInput' onChange={this.processInput}/>
                <button id='save-company' className='btn btn-primary' onClick={this.processNewLot}>Save</button>
              </div>
              <div id='new-company-div'>
                <span style={{textAlign: 'center', marginLeft: '50px'}}>New Company, New Lot</span>
                <input placeholder='Company Name'  value={this.state.companyInput} id='companyInput' onChange={this.processInput}/>
                <input placeholder='Lot Number'  value={this.state.companyLotInput} id='companyLotInput' onChange={this.processInput}/>
                <button id='save-company' className='btn btn-primary' onClick={this.processNewCompany}>Save</button>
              </div>
            </div>
          : <div id='lot-buttons'>
          {data.ingredients.map((ingredient, index)=>{
            return (
              <button className='btn btn-primary' onClick={this.showLotInput}>{ingredient}</button>
            )
          })}
          </div>
        }
      </div>
    );
  }
}

export default NewLot;
