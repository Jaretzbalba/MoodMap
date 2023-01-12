const cloudinary = require('../middleware/cloudinary');
const Post = require('../models/Post');
const moment = require('moment');
const mongoose = require('mongoose');

module.exports = {
  getProfile: async (req, res) => {
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      // const posts = await Post.find({ user: req.user.id }).sort({ date: 'asc' }).lean();
      const posts = await Post.aggregate([
        {
          $match: {
            user: mongoose.Schema.Types.ObjectId,
            date: {
              $gte: moment().day(1).startOf('day').toDate(),
              $lte: moment().day(8).endOf('day').toDate(),
            },
          },
        },
      ]).sort({ date: 'asc' });
      //Sending post data from mongodb and user data to ejs template
      res.render('profile.ejs', { posts: posts, user: req.user, moment: moment });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: 'asc' }).lean();
      res.render('feed.ejs', { posts: posts, user: req.user, moment: moment });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      //id parameter comes from the post routes
      //router.get("/:id", ensureAuth, postsController.getPost);
      //http://localhost:2121/post/631a7f59a3e56acfc7da286f
      //id === 631a7f59a3e56acfc7da286f
      const post = await Post.findById(req.params.id);
      res.render('post.ejs', { post: post, user: req.user, moment: moment });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      console.log(req.body);
      await Post.create({
        date: req.body.date,
        mood: {
          happy: req.body.happy,
          sad: req.body.sad,
          angry: req.body.angry,
          stressed: req.body.stressed,
          anxious: req.body.anxious,
          excited: req.body.excited,
          neutral: req.body.neutral,
          tired: req.body.tired,
        },
        grateful_text: req.body.grateful,
        looking_forward_text: req.body.looking_forward,
        user: req.user.id,
      });
      console.log('Post has been added!');
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      await Post.remove({ _id: req.params.id });
      console.log('Deleted Post');
      res.redirect('/profile');
    } catch (err) {
      res.redirect('/profile');
    }
  },
};
