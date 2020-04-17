const connection = require('../database/connection');// com isso torna possivel fazer alterações no banco de dados

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query; // paginação
        
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//tras tambem a informação da ong responsavel no incidente
            .limit(5) // limitando 5 registros por pagina
            .offset((page -1) * 5) // sempre limpa os registros e pega os proximos 5
            .select([
                'incidents.*', 
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]); // campos especificos que quero exibir sobre a ong
        
        response.header('X-Total-Count', count['count(*)']);//quantidade de casos sera contada e exibida no header

        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id]= await connection('incidents').insert({
            ong_id,
            title,
            description,
            value,           
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },
};