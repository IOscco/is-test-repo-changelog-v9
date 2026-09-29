import { Repository } from 'typeorm';
import { Context } from '../../middleware/context';
import { getLogger } from '../../utils/logger';
import { AppDataSource } from '../../utils/database';
import { CustomerRepository } from '../customer.repository';
import { CustomerModel } from '../models/customer.model';

export class PgCustomerRepository implements CustomerRepository {
    private readonly repository: Repository<CustomerModel>;

    constructor() {
        this.repository = AppDataSource.getRepository(CustomerModel);
    }

    /**
     * @inheritdoc
     */
    async findById(ctx: Context, id: number): Promise<CustomerModel | null> {
        getLogger(ctx).debug(`Buscando cliente id=${id}`);

        try {
            return await this.repository.findOne({ where: { id, activo: true } });
        } catch (error: unknown) {
            const detail = error instanceof Error ? error.message : String(error);
            getLogger(ctx).error(`Error al buscar cliente id=${id}: ${detail}`);
            throw new Error(`Error al buscar cliente: ${detail}`);
        }
    }
}
