const router = require("express").Router();
const layout = require('../../utils/auth');
const {Post, User, Comment} = require("../../models");

router.get('/:id', async (req, res) => {
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
            'created_at',
          ],
          include: [
            {
              model: User,
              attributes: [
                'id',
                'username',
              ],
            }
          ]
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render('post', { post, layout: layout(req) });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router
