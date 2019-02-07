const mongoose = require("mongoose");
var Comment = require('../models/comment');
mongoose.connect(
  `mongodb://localhost:27017/local`,
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) throw err;
    console.log("Successfully connected");
  }
);
var comments = [
  new Comment({
    postId:"5c5ae8597fd1c15f2b9c54d7",
    body:"You're in charge of the Horizon Festival. Customize everything, hire and fire your friends, and explore Australia in over 350 of the world's greatest cars. Make your Horizon the ultimate celebration of cars, music, and freedom of the open road. How you get there is up to you.",
    created_user: '12132141'
  }),
  new Comment({
    postId:"5c5ae8597fd1c15f2b9c54d7",
    body:"2 You're in charge of the Horizon Festival. Customize everything, hire and fire your friends, and explore Australia in over 350 of the world's greatest cars. Make your Horizon the ultimate celebration of cars, music, and freedom of the open road. How you get there is up to you.",
    created_user: '12132141'
  }),
  new Comment({
    postId:"5c5ae8597fd1c15f2b9c54d7",
    body:"3 You're in charge of the Horizon Festival. Customize everything, hire and fire your friends, and explore Australia in over 350 of the world's greatest cars. Make your Horizon the ultimate celebration of cars, music, and freedom of the open road. How you get there is up to you.",
    created_user: '12132141'
  }),
  new Comment({
    postId:"5c5ae8597fd1c15f2b9c54d7",
    body:"3 You're in charge of the Horizon Festival. Customize everything, hire and fire your friends, and explore Australia in over 350 of the world's greatest cars. Make your Horizon the ultimate celebration of cars, music, and freedom of the open road. How you get there is up to you.",
    created_user: '12132141'
  })
];
var done = 0;
for (var i = 0; i < comments.length; i++) {
  comments[i].save(function(err, result) {
    done++;
    if (done === comments.length) {
      exit();
    }
  });
}
function exit() {
  mongoose.disconnect();
  console.log("Ok");
}
