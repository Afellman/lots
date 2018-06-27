const MongoClient = require('mongodb').MongoClient
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/";
var ObjectId = require('mongodb').ObjectID;
let db;

MongoClient.connect(MONGODB_URI, (err, client) => {
  if (err) return console.log(err)
  db = client.db('abrahams-lot-numbers') // whatever your database name is
})



module.exports = {
  // findAll: (req, res) => {
  //   db.Astroid.find({})
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  saveOne: (req, res) => {
    db.collection(req.body.collection)
    .save(req.body.newBatch, (err, result)=> {
      if (err) console.log(err, 'db.save error')
      console.log('New Batch Saved!')
      console.log(req.body.newBatch)
      res.send(result)
    })
  },
  getNoDates: (req, res) => {
    db.collection('noDate')
      .find({}).toArray((err, result) =>{
        res.send(result)
      })
  },
  deleteOne: (req, res) => {
    console.log(req.body, 'req.body')
    db.collection(req.body.collection)
      .deleteOne({'_id': ObjectId(req.body.id)}, (err, result)=>{
        if (err) console.log(err, 'db.delete error')
        res.send(result)
      })
  },
  getTen: (req, res) => {
    let skips = parseInt(req.params.skip, 10)
      db.collection('batch').find().sort({'expDate': -1}).limit(10).skip(skips).toArray((err, result) =>{
        res.send(result)
      })
  },
  updateOne: (req, res) => {
    db.collection('batch').update({'_id': req.body.id}, {$set : {'expDate' : req.body.date}}, (err, result)=> {
      if (err) console.log(err, 'db.save error')
      console.log('Batch updated')
    })
  }
}



