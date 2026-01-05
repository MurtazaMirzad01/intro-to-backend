import { Post } from "../models/post.model.js";

//Create a post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({
                message: "All Fields are required!"
            });
        }
        const post = await Post.create({ name, description, age });
        res.status(201).json({
            message: "Post Created Successfuly!", post
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

//Read all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

//update post 
const updatePost = async (req, res) => {
    try {
        // basic validition to check if body is empty
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No Data provided for update"
            });
        }
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!post) {
            return res.status(404).json({
                message: "post not found!"
            });
        }
        res.status(200).json({
            message: "post updated successfully", post
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}
//delete a post
const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!deleted) return res.status(404).json({
            message: "Post no found!"
        });

        res.status(200).json({
            message: "post deleted successfylly!"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export {
    createPost,
    getPosts,
    updatePost,
    deletePost
}