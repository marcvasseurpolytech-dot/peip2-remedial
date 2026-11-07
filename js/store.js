import { createLocalStore } from './store-local.js';
import { createApiStore } from './store-api.js';

export function createStore() {
  const c = window.PEIP2_CONFIG || {};
  return c.demo ? createLocalStore() : createApiStore();
}
