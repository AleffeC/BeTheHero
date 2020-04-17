const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');//Joi é a biblioteca de validação

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileControllerController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//create da sessions
routes.post('/sessions', SessionController.create);

/// Listar
routes.get('/ongs', OngController.index);

// Cadastro
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create); // segue a ordem da esquerda pra direta, chamadas sempre por ultimo

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),ProfileControllerController.index);

//Listar/Cadastrar incidentes
routes.post('/incidents', IncidentController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}),IncidentController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}),IncidentController.delete);

module.exports = routes;