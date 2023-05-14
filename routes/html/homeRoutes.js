const router = require("express").Router()
const { User, Post } = require('../../models');
const { withAuth, layoutFunc } = require('../../utils/auth');

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

router.get('/*', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: [
            'id',
            'username'
          ]
        }
      ],
      order: [['created_at', 'DESC']],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
      layout: layoutFunc(req)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router
