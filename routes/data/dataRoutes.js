var Obj = require('../../models/object');
var mongoose = require('mongoose');


module.exports = {
  /**Start test route (GET) */
  start: function (req, res, next) {
    res.json('Hisda')
  }
  ,
  //  create: function(req,res,next){

  //   var obj = {
  //     Exchange: "fsd",
  //     Base:"fsdfs",
  //     Quote:"eryer",
  //     TimeStart: new Date(), 
  //     PriceOpen: 987,
  //     PriceHigh: 789,
  //     PriceLow:  123,
  //     PriceClose: 322,
  //     source: 'string'
  //   };
  //   var newObj = new Obj(obj);


  //   newObj.save(function (err, post) {
  //     res.json(post);
  //   });
  //  }
  //,

  /**Start test route (GET) */
  data: function (req, res, next) {
    Obj.find({})
    .limit(3)
    .exec()
    .then(doc =>{
      let newArr = {}
      newArr.Exchange = doc[0].Exchange;
      newArr.Base = doc[0].Base;
      newArr.Quote= doc[0].Quote;
      console.log(newArr)
      return newArr})
    .then((doc)=>{
      res.json(doc)
    })
  }
}