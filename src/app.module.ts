import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { MetricsController } from '@application/metrics/metrics.controller';
import { MetricsService } from '@infrastructure/metrics/prometheus.service';
import { MetricsMiddleware } from '@infrastructure/metrics/metrics.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [AppController, MetricsController],
  providers: [
    AppService,
    MetricsService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: GlobalLoggerInterceptor,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: GlobalExceptionFilter,
    // },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
