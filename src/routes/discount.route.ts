import { Server } from '@hapi/hapi';
import { DiscountController } from '../controllers/discount.controller';

const discountController = new DiscountController();

export const discountRoutes = (server: Server): void => {
    server.route({
        method: 'POST',
        path: '/v1/discounts',
        handler: discountController.calculate.bind(discountController)
    });
};
