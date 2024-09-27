import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
// import { RequestWithContext } from '../interfaces/request-with-user.interface';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(
    executionContext: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const httpContext = executionContext.switchToHttp();

    // const request = httpContext.getRequest<Request | RequestWithContext>();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    const { path, method } = request;
    const { statusCode } = response;
    this.logger.log(`${method} ${path}`);

    const requestFirstTimestamp = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          // this.logger.log(`Rota acessada pelo usuário: ${request.user.sub}`);
          this.logger.log(`Rota acessada pelo usuário: `);
        }
        const routeExecutionTime = Date.now() - requestFirstTimestamp;
        this.logger.log(
          `Resposta: status ${statusCode} - ${routeExecutionTime}ms`,
        );
      }),
    );
  }
}
