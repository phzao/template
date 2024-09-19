import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { MetricsService } from './prometheus.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const originalEnd = res.end.bind(res);
    const startEpoch = process.hrtime.bigint();

    res.end = (...args: any[]) => {
      const diff = process.hrtime.bigint() - startEpoch;
      const responseTimeInSeconds = Number(diff) / 1e9;

      this.metricsService.requestCounter.inc({
        method: req.method,
        statusCode: res.statusCode,
        path: req.path,
      });

      this.metricsService.responseTimeHistogram.observe(
        {
          method: req.method,
          statusCode: res.statusCode,
          path: req.path,
        },
        responseTimeInSeconds,
      );

      return originalEnd(...args);
    };

    next();
  }
}
