const MongoClient = require('mongodb').MongoClient
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/";
let db;

MongoClient.connect(MONGODB_URI, (err, client) => {
  if (err) return console.log(err)
  db = client.db('abrahams-lot-numbers') // whatever your database name is
})

module.exports = {

  findAll: (req, res) => {
    db.collection('lot').find({}).toArray((err, result) =>{
      console.log(result)
      res.send(result)
    })
  },
  
  findOne: (req, res) => {
    console.log(req.params)
    db.collection('lot').find({ingredient: req.params.ingredient}).toArray((err, result)=>{
      console.log('findone result', result)
      res.send(result)
    })
  },
  
  saveOne: (req, res) => {
      let {ingredient, lot, company}  = req.body
      // Getting the current lot collection and writing it to lot_backups
      // before updating it. 
      db.collection('lot').find({}).toArray((err, result)=>{
        result.push({date: new Date})
        db.collection('lot_backups').insertOne({result}, (err, res)=> {
          if (err) {console.log(err)}
          db.collection('lot').update({"ingredient": ingredient}, {$set : {'lot' : lot, "company": company}}, (err, result)=> {
            if (err) console.log(err, 'db.save error')
            console.log('New Lot Saved!')
          })
        })
      })
  },

}




