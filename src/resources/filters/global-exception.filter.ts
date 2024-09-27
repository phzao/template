import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

// import { RequestWithContext } from '@interfaces/request-with-user.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private httpAdapterHost: HttpAdapterHost,
    private consoleLogger: ConsoleLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    this.consoleLogger.error(exception);

    const { httpAdapter } = this.httpAdapterHost;

    const httpContext = host.switchToHttp();
    const response = httpContext.getResponse();
    // const request = httpContext.getRequest<Request | RequestWithContext>();
    const request = httpContext.getRequest<Request>();

    if ('user' in request) {
      this.consoleLogger.log(
        // `Rota acessada pelo usuário: ${request?.user?.name}`,
        `Rota acessada pelo usuário: `,
      );
    }

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(request),
            },
          };

    httpAdapter.reply(response, body, status);
  }
}
