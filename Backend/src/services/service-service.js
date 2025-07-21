const ServiceRepository = require('../repository/service-repository');
class Service{
    async createService(data){
        try {
            const reponse = await ServiceRepository.createService(data);
            return reponse;
        } catch (error) {
            console.log("Error in Service layer",error);
            throw error;
        }
    }
    async getAllServices(){
        try {
            const reponse = await ServiceRepository.getAllServices();
            return reponse;
        } catch (error) {
            console.log("Error in Service layer",error);
            throw error;
        }
    }
    async getServiceById(id){
        try {
            const response = await ServiceRepository.getServiceById(id);
            return response;
        } catch (error) {
            console.log("Error in Service layer",error);
            throw error;
        }
    }
    async updateService(id,data){
        try {
            const response = await ServiceRepository.updateService(id,data);
            return response;
        } catch (error) {
            console.log("Error in Service layer",error);
            throw error;
        }
    }
    async deleteService(id){
        try {
            const response = await ServiceRepository.deleteService(id);
            return response;
        } catch (error) {
            console.log("Error in Service layer",error);
            throw error;
        }
    }
}
module.exports= new Service();



