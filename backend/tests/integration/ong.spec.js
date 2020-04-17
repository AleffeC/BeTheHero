const request = require('supertest'); //ferramente de testes
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); //zera o banco antes de comçar o teste para nao ficar gerando muitos dados no banco de teste 
        await connection.migrate.latest();//cria as migrations para o banco de teste sempre que for começar 
    });

    afterAll(async () => {
        await connection.destroy(); //termina a conexão com banco quando terminar tudo 
    });
    
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        // .set('Authorization', 'id aqui') no caso de testar algo que precise de um id obrigatorio
        .send({
            name: "APAD2",
            email: "contato@apad.com.br",
            whatsapp: "4700000000",
            city: "Rio do Sul",
            uf: "SC"
        }); //realiza a inserção no banco de teste passando os dados acima 

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);//validaçoes finais do que esperar da inserção acima
    });
});