const {Service} = require('../models');
class ServiceRepository{
    async createService(data){
        try {
            return await Service.create(data);
        } catch (error) {
            console.log("Error in Repo",error);
            throw error;
        }
    }
    async getAllServices(){
        try {
            return await Service.findAll();
        } catch (error) {
            console.log("Error in Repo",error);
            throw error;
        }
    }
    async getServiceById(id){
        try {
            return await Service.findByPk(id);
        } catch (error) {
            console.log("Error in repo",error);
            throw error;
        }
    }
    async updateService(id, data){
        try {
            return await Service.update(data,{where :{id}});
        } catch (error) {
            console.log("Error in repo",error);
        }
    }
    async deleteService(id){
        try {
            return await Service.destroy({where :{id}});
        } catch (error) {
            console.log("Error in repo",error);
            throw error;
        }
    }
}
module.exports= new ServiceRepository();