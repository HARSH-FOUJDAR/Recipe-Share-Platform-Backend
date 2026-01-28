const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const CommentControllers = require("../controllers/comment.controller");
//user Add comment
router.post("/comment", authenticate, CommentControllers.addComment);


//user get comment
router.get("/comment/:id", authenticate, CommentControllers.getComment);
//user delet comment
router.delete("/delete/:id", authenticate, CommentControllers.deleteComment);

module.exports = router;
