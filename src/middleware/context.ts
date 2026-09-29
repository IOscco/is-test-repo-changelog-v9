import { RequestApplicationState, Server } from '@hapi/hapi';
import { v4 as uuidv4 } from 'uuid';

export interface ContextRequestApplicationState extends RequestApplicationState {
    context: Context;
}

export class Context {
    applicationId: string;
    transactionId: string;
}

/**
 * Crea el contexto de trazabilidad de cada request a partir de los headers
 */
export const contextServerMiddleware = (server: Server): void => {
    server.ext('onRequest', (request, h) => {
        const context: Context = {
            applicationId: String(request.headers['application-id'] || ''),
            transactionId: String(request.headers['transaction-id'] || uuidv4())
        };
        (request.app as ContextRequestApplicationState).context = context;
        return h.continue;
    });
};
