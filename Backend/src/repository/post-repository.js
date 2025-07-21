const {Post}= require('../models');
class PostRepository{
    async createPost(data){
        try {
            return await Post.create(data);
        } catch (error) {
            console.log("Error in post repo", error);
            throw error;
        }
    }
    async getAllPosts(){
        try {
            return await Post.findAll()
        } catch (error) {
            console.log("Error in post repo", error);
            throw error;
        }
    }
    async getPostById(id){
        try {
            return await Post.findByPk(id);
        } catch (error) {
            console.log("Error in post repo", error);
            throw error;
        }
    }
    async getPostBySlug(slug){
        try {
            return await Post.findOne({ where: { slug } });
        } catch (error) {
            console.log("Error in post repo", error);
            throw error;
        }
    }
    async updatePost(id, data){
        try {
            return await Post.update(data,{ where: { id } });
        } catch (error) {
            console.log("Error in post repo", error);
            throw error;
        }
    }
    async deletePost(id){
        try {
            return await Post.destroy({where :{id}});
        } catch (error) {
            console.log("Error in post repo", error);
            throw error;
        }
    }
}
module.exports = new PostRepository();