const PostService = require('../services/post-service');

const createPost = async (req, res) => {
    try {
        const post = await PostService.createPost(req.body);
        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create post",
            data: {},
            err: error
        });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await PostService.getAllPosts();
        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: posts,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch posts",
            data: {},
            err: error
        });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await PostService.getPostById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            data: post,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch post",
            data: {},
            err: error
        });
    }
};

const getPostBySlug = async (req, res) => {
    try {
        const post = await PostService.getPostBySlug(req.params.slug);
        return res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            data: post,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch post",
            data: {},
            err: error
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const updated = await PostService.updatePost(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updated,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update post",
            data: {},
            err: error
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const deleted = await PostService.deletePost(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: deleted,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete post",
            data: {},
            err: error
        });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    getPostBySlug,
    updatePost,
    deletePost
};
