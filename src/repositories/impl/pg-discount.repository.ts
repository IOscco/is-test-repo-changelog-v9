import { Context } from '../../middleware/context';
import { getLogger } from '../../utils/logger';
import { AppDataSource } from '../../utils/database';
import { CustomerModel } from '../models/customer.model';
import { DiscountRepository } from '../discount.repository';

export class PgDiscountRepository implements DiscountRepository {
    async findSegment(ctx: Context, customerId: number): Promise<string> {
        getLogger(ctx).debug(`Buscando segmento del cliente id=${customerId}`);
        const customer = await AppDataSource.getRepository(CustomerModel).findOne({
            where: { id: customerId, activo: true }
        });
        return customer?.segmento ?? '';
    }
}
