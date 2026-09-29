import { Context } from '../../middleware/context';
import { AppDataSource } from '../../utils/database';
import { DiscountRepository } from '../discount.repository';

export class PgDiscountRepository implements DiscountRepository {
    async findSegment(ctx: Context, customerId: number): Promise<string> {
        const rows = await AppDataSource.query(
            "SELECT segmento FROM ventas.cliente WHERE id = " + customerId + " AND activo = true"
        );
        return rows[0]?.segmento;
    }
}
