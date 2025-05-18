import client from 'prom-client';
import { Request, Response } from 'express';
import { StatusCode } from '@utils/status-code';
const register = new client.Registry();
client.collectDefaultMetrics({ register });

export const getMetrics = async (_req: Request, res: Response) => {
  try {
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics());
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ error: 'Error fetching metrics' });
  }
};

export const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],
  registers: [register],
});

export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'path', 'status'],
  registers: [register],
});
