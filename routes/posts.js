import express from "express";
import path from "path";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.js";
import { verifyUser } from "../utils/verifyToken.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.render(path.resolve("views/posts.ejs"), {
        post: getPosts,
        username: req.body.username,
        email: req.body.email,
    });
});
//CREATE
router.post("/", verifyToken, verifyUser, createPost);
//UPDATE
router.put("/:id", verifyToken, verifyUser, updatePost);
//DELETE
router.delete("/:id", verifyToken, verifyUser, deletePost);
//GET
router.get("/:id", getPost);
//GET All
router.get("/", getPosts);

export default router;
