const httpStatus = require("http-status");
const Post = require("../modal/post.model");

const createPost = async (req, res) => {
  const user = JSON.parse(req.headers.user);
  req.body.author = user.id;

  const post = await Post.create(req.body);
  return res.status(httpStatus.CREATED).send(post);
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .populate("media");
    return res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.headers.userID;
    
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Increment the reactions (likes) count
    post.reactions += 1;
    await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  likePost,
};
