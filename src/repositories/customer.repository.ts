import { Context } from '../middleware/context';
import { CustomerModel } from './models/customer.model';

export interface CustomerRepository {
    /**
     * Busca un cliente activo por su identificador
     * @param ctx - Contexto de trazabilidad
     * @param id - Identificador del cliente
     * @returns Cliente o null si no existe
     */
    findById(ctx: Context, id: number): Promise<CustomerModel | null>;
}
