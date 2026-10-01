import { Context } from '../middleware/context';

export interface DiscountRepository {
    findSegment(ctx: Context, customerId: number): Promise<string>;
}
