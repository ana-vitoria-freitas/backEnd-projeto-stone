exports.options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Swagger tutorial',
        description: 'Swagger tutorial APIS',
        version: '1.0.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: 'https://projeto-stone-api.herkuapp.com',
      schemes: ['https'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
};