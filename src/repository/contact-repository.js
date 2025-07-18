const {Contact} = require('../models');
class ContactRepository{
    async createContact(data){
        try {
            return await Contact.create(data);
        } catch (error) {
            console.log("Error in repo",error);
            throw error;
        }
    }
    async getAllContacts(){
        try {
            return await Contact.findAll();
        } catch (error) {
            console.log("Error in repo",error);
            throw error;
        }
    }
    async getContactById(id){
        try {
            return await Contact.findByPk(id);
        } catch (error) {
            console.log("Error in repo",error);
            throw error;
        }
    }
    async deleteContact(id){
        try {
            return await Contact.destroy({where:{id}})
        } catch (error) {
            console.log("Error in repo",error);
            throw error;
        }
    }
}
module.exports=new ContactRepository();