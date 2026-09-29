import * as Joi from 'joi';
import * as Boom from '@hapi/boom';
import { Server } from '@hapi/hapi';
import { CustomerController } from '../controllers/customer.controller';

const customerController = new CustomerController();

export const customerRoutes = (server: Server): void => {
    server.route({
        method: 'GET',
        path: '/v1/customers/{id}',
        options: {
            description: 'Obtiene un cliente activo',
            tags: ['api', 'customers'],
            validate: {
                params: Joi.object({ id: Joi.number().integer().positive().required() }),
                failAction: () => Boom.badRequest('Parámetros inválidos')
            }
        },
        handler: customerController.getCustomer.bind(customerController)
    });
};
