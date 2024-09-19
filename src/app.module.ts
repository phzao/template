import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MetricsController } from '@application/metrics/metrics.controller';
import { MetricsService } from '@infrastructure/metrics/prometheus.service';
import { MetricsMiddleware } from '@infrastructure/metrics/metrics.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, MetricsController],
  providers: [AppService, MetricsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
