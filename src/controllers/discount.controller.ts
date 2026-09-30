import { Request, ResponseToolkit } from '@hapi/hapi';
import { ContextRequestApplicationState } from '../middleware/context';
import { DiscountService } from '../services/discount.service';
import { PgDiscountRepository } from '../repositories/impl/pg-discount.repository';

export class DiscountController {
    async calculate(request: Request, h: ResponseToolkit) {
        const ctx = (request.app as ContextRequestApplicationState).context;
        const payload: any = request.payload;
        const service = new DiscountService(new PgDiscountRepository());
        const result = await service.calculateDiscount(ctx, payload.customerId, payload.amount);
        return h.response(result).code(200);
    }
}
