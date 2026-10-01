import * as Hapi from '@hapi/hapi';
import { environmentConfig } from './utils/environment';
import { connectToDatabase } from './utils/database';
import { contextServerMiddleware } from './middleware/context';
import { customerRoutes } from './routes/customer.route';
import { discountRoutes } from './routes/discount.route';

const init = async (): Promise<void> => {
    await connectToDatabase();

    const server = Hapi.server({ port: environmentConfig.getPort(), host: '0.0.0.0' });
    contextServerMiddleware(server);
    customerRoutes(server);
    discountRoutes(server);

    await server.start();
    console.info(`Servidor iniciado en ${server.info.uri}`);
};

init().catch((error) => {
    console.error('Error al iniciar el servidor', error);
    process.exit(1);
});
