import { Request, ResponseToolkit } from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import { Context, ContextRequestApplicationState } from '../middleware/context';
import { getLogger } from '../utils/logger';
import { CustomerService } from '../services/customer.service';
import { PgCustomerRepository } from '../repositories/impl/pg-customer.repository';

export class CustomerController {
    /**
     * GET /v1/customers/{id}
     */
    async getCustomer(request: Request, h: ResponseToolkit) {
        const ctx = this.getContext(request);

        try {
            const service = new CustomerService(new PgCustomerRepository());
            const customer = await service.getCustomer(ctx, Number(request.params.id));
            if (!customer) {
                return Boom.notFound('Cliente no encontrado');
            }
            return h.response(customer).code(200);
        } catch (error: unknown) {
            const detail = error instanceof Error ? error.message : String(error);
            getLogger(ctx).error(`Error en getCustomer: ${detail}`);
            return Boom.internal('Error al obtener el cliente');
        }
    }

    private getContext(request: Request): Context {
        return (request.app as ContextRequestApplicationState).context;
    }
}
