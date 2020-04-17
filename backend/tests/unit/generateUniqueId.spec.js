const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        // expect(2+2).toBe(5); // validação de teste se o que estiver aqui dentro for verdade o teste tera sucesso 
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
});