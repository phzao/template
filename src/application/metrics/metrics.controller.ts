import { Response } from 'express';
import { Controller, Get, Res } from '@nestjs/common';
import { MetricsService } from '@infrastructure/metrics/prometheus.service';

@Controller('metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Get()
    async getMetrics(@Res() response: Response) {
        response.set('Content-Type', this.metricsService.getRegistry().contentType);
        response.end(await this.metricsService.getRegistry().metrics());
    }
}
