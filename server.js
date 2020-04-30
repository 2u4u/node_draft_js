const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

//db config
const db = require("./config/keys").mongoURI;

//connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error -> ", err));

const app = express();
const port = require("./config/keys").PORT || 5000;

// Load Model
const Post = require('./models/post.model');

// To get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/add", (req, res) => {
  let id = req.body.id ? req.body.id : null;
  Post.findById(id)
    .then(post => {
      if (post) {
        const postFields = {};
        if (req.body.topic) postFields.topic = req.body.topic;
        if (req.body.description) postFields.description = req.body.description;
        Post.findOneAndUpdate({ _id: id }, { $set: postFields }, { new: true })
          .then(result => {
            return res.status(201).send({
              success: true,
              data: result,
              message: "Post updated successfully",
              type: "success"
            })
          })
          .catch(err => console.log("Post update err -> ", err));
      } else {
        const newPost = new Post(req.body);
        newPost.save()
          .then(result => {
            res.status(201).send({
              success: true,
              data: result,
              message: "Post created successfully",
              type: "success"
            });
          })
          .catch(err => console.log("Create new post error -> ", err))
      }
    })
    .catch(err => console.log("Post add error -> ", err))
})

app.get("/api", (req, res) => {
  Post.find({})
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log("Create new post error -> ", err)
    })
})

app.delete("/api/:post_id", (req, res) => {
  Post.findByIdAndDelete(req.params.post_id)
    .then(result => {
      res.status(200).send({
        success: true,
        data: result,
        message: "Post deleted successfully",
        type: "success"
      });
    })
    .catch(err => console.log("Post delete err -> ", err));
});

if (require("./config/keys").NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, function () {
  console.log('App listening on port ' + port);
});
