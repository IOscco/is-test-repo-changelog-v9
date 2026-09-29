import { pino } from 'pino';
import { Context } from '../middleware/context';
import { environmentConfig } from './environment';

const logger = pino({ level: environmentConfig.getLogLevel() });

/**
 * Logger con los datos de trazabilidad del contexto
 * @param ctx - Contexto de la operación
 * @returns Logger hijo con transactionId y applicationId
 */
export const getLogger = (ctx: Context) =>
    logger.child({ transactionId: ctx.transactionId, applicationId: ctx.applicationId });
