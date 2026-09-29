import { CustomerService } from '../../src/services/customer.service';
import { CustomerRepository } from '../../src/repositories/customer.repository';
import { CustomerModel } from '../../src/repositories/models/customer.model';

jest.mock('../../src/utils/logger', () => ({
    getLogger: jest.fn(() => ({ info: jest.fn(), debug: jest.fn(), error: jest.fn() }))
}));

describe('CustomerService', () => {
    const ctx = { transactionId: 'tx', applicationId: 'app' };
    let repositoryMock: jest.Mocked<CustomerRepository>;
    let service: CustomerService;

    beforeEach(() => {
        repositoryMock = { findById: jest.fn() };
        service = new CustomerService(repositoryMock);
    });

    it('debe retornar el cliente cuando existe', async () => {
        // Arrange
        const customer = { id: 1, nombre_completo: 'Ana', email: 'ana@test.pe', segmento: 'PLATA', activo: true } as CustomerModel;
        repositoryMock.findById.mockResolvedValueOnce(customer);

        // Act
        const result = await service.getCustomer(ctx, 1);

        // Assert
        expect(result).toEqual(customer);
        expect(repositoryMock.findById).toHaveBeenCalledWith(ctx, 1);
    });

    it('debe retornar null cuando el cliente no existe', async () => {
        // Arrange
        repositoryMock.findById.mockResolvedValueOnce(null);

        // Act
        const result = await service.getCustomer(ctx, 99);

        // Assert
        expect(result).toBeNull();
    });

    it.each([0, -1, 1.5])('debe lanzar error cuando el id es %p', async (id) => {
        // Arrange / Act / Assert
        await expect(service.getCustomer(ctx, id)).rejects.toThrow('entero positivo');
        expect(repositoryMock.findById).not.toHaveBeenCalled();
    });
});
