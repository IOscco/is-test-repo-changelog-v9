import { Context } from '../middleware/context';
import { getLogger } from '../utils/logger';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerModel } from '../repositories/models/customer.model';

export class CustomerService {
    constructor(private readonly customerRepository: CustomerRepository) {}

    /**
     * Obtiene un cliente activo
     * @param ctx - Contexto de trazabilidad
     * @param id - Identificador del cliente
     * @returns Cliente o null si no existe
     */
    async getCustomer(ctx: Context, id: number): Promise<CustomerModel | null> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('El id del cliente debe ser un entero positivo');
        }

        const customer = await this.customerRepository.findById(ctx, id);
        getLogger(ctx).info(`Cliente id=${id} ${customer ? 'encontrado' : 'no encontrado'}`);
        return customer;
    }
}
