import { collectDefaultMetrics, Registry, Counter, Histogram } from 'prom-client';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class MetricsService implements OnModuleInit {
  private readonly registry: Registry;

  constructor() {
    this.registry = new Registry();
  }

  onModuleInit() {
    collectDefaultMetrics({ register: this.registry });

    this.requestCounter = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'statusCode', 'path'],
    });

    this.responseTimeHistogram = new Histogram({
      name: 'http_response_time_seconds',
      help: 'HTTP response times in seconds',
      labelNames: ['method', 'statusCode', 'path'],
      buckets: [0.1, 0.5, 1, 1.5, 2, 5, 10, 50, 100, 200, 300, 400, 500, 1000],
    });

    this.registry.registerMetric(this.requestCounter);
    this.registry.registerMetric(this.responseTimeHistogram);
  }

  getRegistry(): Registry {
    return this.registry;
  }

  public requestCounter: Counter<string>;
  public responseTimeHistogram: Histogram<string>;
}
