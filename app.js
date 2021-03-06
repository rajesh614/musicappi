const express = require('express');
const app = express();
const port = process.env.PORT || 9999;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongourl = "mongodb+srv://Rajesh:rajesh@123@cluster0.tlpyr.mongodb.net/MUSIC?retryWrites=true&w=majority";

let db;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//health Check
app.get('/',(req,res) => {
    res.send("Health Ok");
});

// //city Route
// app.get('/artist',(req,res) => {
//     db.collection('Artist').find().toArray((err,result) => {
//       if(err) throw err;
//       res.send(result)
//     })
//   })

//  //movie details
// app.get('/hall/:id',(req,res) =>{
//   var id = req.params.id
//   db.collection('Hall').find({_id:id}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

//  //movies details
//  app.get('/movies/:id',(req,res) =>{
//   var id = req.params.id

//   db.collection('movietype').find({_id:id}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// //city Route
// app.get('/hall',(req,res) => {
//   var condition ={};
//    //movie +city
//   if(req.query.movie && req.query.city){
//     condition={$and:[{"Movie.movie":req.query.movie},{city:req.query.city}]}
//   }
//    //movietype
//   else if(req.query.movie){
//     condition={"Movie.movie":req.query.movie}
//   }
//   //city
//   else if(req.query.city){
//     condition={city:req.query.city}
//   }
//   db.collection('Hall').find(condition).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// app.get('/movies',(req,res) => {
//   db.collection('movietype').find().toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

//placeorder
app.post('/keep',(req,res)=>{
  db.collection('surveylist').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
})

//get all bookings
app.get('/lists',(req,res) => {
  db.collection('surveylist').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//connection with mongo serer
MongoClient.connect(mongourl,(err,connection) => {
    if(err) console.log(err);
    db = connection.db('JANUARY');
  
    app.listen(port,(err) => {
      if(err) throw err;
      console.log(`Server is running on port ${port}`)
    })
  })
