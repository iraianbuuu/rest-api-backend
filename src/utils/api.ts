import { config } from '../config';

export enum API_ENDPOINTS {
  AUTH = '/auth',
  USERS = '/users',
  TICKETS = '/tickets',
  METRICS = '/metrics',
  API_DOCS = '/api-docs',
}

export const AUTH_URL = config.baseUrl + API_ENDPOINTS.AUTH;
export const USERS_URL = config.baseUrl + API_ENDPOINTS.USERS;
export const TICKETS_URL = config.baseUrl + API_ENDPOINTS.TICKETS;
export const METRICS_URL = config.baseUrl + API_ENDPOINTS.METRICS;
export const DOCS_URL = config.baseUrl + API_ENDPOINTS.API_DOCS;
