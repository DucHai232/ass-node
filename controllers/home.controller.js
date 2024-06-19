const watchModel = require("../models/watch.model");
const CommentModel = require("../models/comment.model");
module.exports = {
  renderHome: async (req, res) => {
    try {
      const watches = await watchModel.find();
      let commentsId = [];
      watches.forEach(
        (watch) => (commentsId = commentsId.concat(watch.comments))
      );

      const comments = await CommentModel.find({ _id: { $in: commentsId } });

      const commentByWatch = watches.map((watch) => {
        const cmtWatch = comments.filter((cmt) =>
          watch.comments.includes(cmt._id.toString())
        );
        return {
          ...watch._doc,
          comments: cmtWatch,
        };
      });
      res.render("home.ejs", { watches: commentByWatch });
    } catch (error) {
      console.log(error.message);
    }
  },
};
