"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Psel XP Swagger',
            description: 'Api de uma corretora de ações',
            version: '1.0',
        },
        server: [
            {
                url: 'https://psel-xp.herokuapp.com/',
                description: 'heroku',
            },
        ],
    },
    apis: ['./public/routes/ativos.routes.js', './public/routes/contas.routes.js', './public/routes/investimentos.routes.js'],
};
