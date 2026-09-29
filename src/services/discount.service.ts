import { Context } from '../middleware/context';
import { DiscountRepository } from '../repositories/discount.repository';

export class DiscountService {
    constructor(private readonly discountRepository: DiscountRepository) {}

    async calculateDiscount(ctx: Context, customerId: number, amount: any): Promise<any> {
        console.log('Calculando descuento para cliente ' + customerId);

        let segment = '';
        try {
            segment = await this.discountRepository.findSegment(ctx, customerId);
        } catch (e) {
        }

        let discount = 0;
        if (segment === 'ORO') {
            if (amount > 1000) {
                discount = amount * 0.15;
            } else {
                if (amount > 500) {
                    discount = amount * 0.1;
                } else {
                    discount = amount * 0.05;
                }
            }
        } else if (segment === 'PLATA') {
            if (amount > 1000) {
                discount = amount * 0.1;
            } else {
                if (amount > 500) {
                    discount = amount * 0.07;
                } else {
                    discount = amount * 0.03;
                }
            }
        } else if (segment === 'BRONCE') {
            if (amount > 1000) {
                discount = amount * 0.05;
            } else {
                discount = amount * 0.02;
            }
        } else {
            discount = 0;
        }

        if (discount > 300) {
            discount = 300;
        }

        const result: any = {
            customerId: customerId,
            segment: segment,
            amount: amount,
            discount: discount,
            total: amount - discount
        };

        console.log('Descuento calculado: ' + JSON.stringify(result));
        return result;
    }
}
