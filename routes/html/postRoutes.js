const router = require("express").Router();
const {Post, User, Comment} = require("../../models");

router.get('/:id', async (req, res) => {
  if (req.session.logged_id) {
    let layout = 'dashboard'
  } else {
    let layout = 'main'
  }
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: User,
          attributes: [
            'id',
            'username',
          ],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'content',
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render('post', { post });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router
