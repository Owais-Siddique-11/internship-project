const ContactRepository = require('../repository/contact-repository');
class ContactService{
    async create(data){
        try {
            const response = await ContactRepository.createContact(data);
            return response;
        } catch (error) {
            console.log("Error in Service layer",error);
            throw error;
        }
    }
    async getAll(){
        try {
            const response = await ContactRepository.getAllContacts();
            return response;
        } catch (error) {
            console.log("Error in Service layer",error);
            throw error;
        }
    }
    async getById(id){
        try {
            const response = await ContactRepository.getContactById(id);
            return response;
        } catch (error) {
            console.log("Error in Service layer",error);
            throw error;
        }
    }
    async delete(id){
        try {
            const response = await ContactRepository.deleteContact(id);
            return response;
        } catch (error) {
            console.log("Error in Service layer",error);
            throw error;
        }
    }

}
module.exports=new ContactService();

