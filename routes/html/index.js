const router = require("express").Router()
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

/* All html page routes would go here */

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'created_at'],
      order: [['created_at', 'DESC']],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
      layout: 'dashboard'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router