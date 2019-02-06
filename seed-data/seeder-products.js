const mongoose = require("mongoose");
var Post = require('../models/post');
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

var posts = [
  new Post({
    title:"Post 1",
    image: '1549455658714.jpg',
    description:"You're in charge of the Horizon Festival. Customize everything, hire and fire your friends, and explore Australia in over 350 of the world's greatest cars. Make your Horizon the ultimate celebration of cars, music, and freedom of the open road. How you get there is up to you.",
    created_user: '12132141'
  }),
  new Post({
    title:"Post 2",
    image: '1549455658714.jpg',
    description:"2 You're in charge of the Horizon Festival. Customize everything, hire and fire your friends, and explore Australia in over 350 of the world's greatest cars. Make your Horizon the ultimate celebration of cars, music, and freedom of the open road. How you get there is up to you.",
    created_user: '12132141'
  }),
  new Post({
    title:"Post 3",
    image: '1549455658714.jpg',
    description:"3 You're in charge of the Horizon Festival. Customize everything, hire and fire your friends, and explore Australia in over 350 of the world's greatest cars. Make your Horizon the ultimate celebration of cars, music, and freedom of the open road. How you get there is up to you.",
    created_user: '12132141'
  }),
  new Post({
    title:"Post 4",
    image: '1549455658714.jpg',
    description:"3 You're in charge of the Horizon Festival. Customize everything, hire and fire your friends, and explore Australia in over 350 of the world's greatest cars. Make your Horizon the ultimate celebration of cars, music, and freedom of the open road. How you get there is up to you.",
    created_user: '12132141'
  })
];
var done = 0;
for (var i = 0; i < posts.length; i++) {
  posts[i].save(function(err, result) {
    console.log(result)
    done++;
    if (done === posts.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
  console.log("Ok");
}
