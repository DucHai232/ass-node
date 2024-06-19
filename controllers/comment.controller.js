const CommentModel = require("../models/comment.model");
const WatchModel = require("../models/watch.model");
module.exports = {
  createComment: async (req, res) => {
    try {
      const userId = req.user;
      const comments = await CommentModel.find();

      const watchId = req.params.id;
      const watchOfId = await WatchModel.findById(watchId);
      const result = watchOfId.comments.includes((cmt) => cmt === userId);
      console.log(result);
      const { content } = req.body;
      const comment = await CommentModel.create({ content, author: userId });
      try {
        await WatchModel.findByIdAndUpdate(watchId, {
          $push: { comments: comment._id },
        });
      } catch (error) {
        console.log(error.message);
      }
      res.redirect("/");
    } catch (error) {
      console.log(error.message);
    }
  },
  renderCreateCommentPage: async (req, res) => {
    res.render("create-comment.ejs", { layout: "" });
  },
};
