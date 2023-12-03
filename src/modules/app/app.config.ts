import { LogLevel, NodeEnv } from '@shared/enums';
import { IncomingMessage, ServerResponse } from 'http';
import { Params } from 'nestjs-pino';

export class AppConfig {
  public static getLoggerConfig(): Params {
    const { NODE_ENV, LOG_LEVEL } = process.env;
    return {
      pinoHttp: {
        autoLogging: true,
        level:
          LOG_LEVEL ||
          (NODE_ENV === NodeEnv.PRODUCTION ? LogLevel.INFO : LogLevel.TRACE),
        customAttributeKeys: {
          responseTime: 'timeSpent',
        },
        formatters: {
          level: (label: string) => ({ level: label }),
          bindings: () => ({ context: 'NestApplication' }),
        },
        serializers: {
          req(request: IncomingMessage) {
            return {
              method: request.method,
              url: request.url,
            };
          },
          res(reply: ServerResponse) {
            return {
              statusCode: reply.statusCode,
            };
          },
        },
        // prettier-ignore
        transport:
          NODE_ENV !== NodeEnv.PRODUCTION
          ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
              messageFormat: '({context}) {msg}',
              ignore: 'context',
            },
          }
          : undefined,
      },
    };
  }
}
