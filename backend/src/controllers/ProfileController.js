const connection = require('../database/connection');// com isso torna possivel fazer alterações no banco de dados
 
 module.exports = { 
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents').where('ong_id', ong_id).select('*');

        return response.json(incidents);
    },
 }