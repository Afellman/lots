import axios from 'axios'

export default {
  newBatch: (newBatch, collection) => {
    return axios.post('/batch/new', {newBatch: newBatch, collection: collection})
  },
  getNoDates: () => {
    return axios.get('/batch/noDates')
  },
  getAllLots: () =>{
    return axios.get('/lots/all')
  },
  getLot: (ingredient) => {
    return axios.get(`/lots/one/${ingredient}`)
  }, 
  newLot: (lot) => {
    return axios.post('/lots/new', lot)
  }, 
  newCompany: (company) => {
    return axios.post('/lots/new', company)
  },
  deleteOne: (id, collection) => {
    return axios.post('/batch/delete', {id: id, collection: collection})
  },
  getTenBatches: (skip)=>{
    return axios.get(`/batch/getTen/${skip}`)
  },
  getAllBatches: () => {
    return axios.get('/batch/all');
  }
}
