import { client } from '../config/redis';

export class RedisClient {
  static _client = client;
  static _ttl = 60 * 60;

  static getCached = async (id: string) => {
    return await client.get(id);
  };

  static putToCache = async (id: string, value: string, ttl?: number) => {
    await client.set(id, value, {
      EX: ttl || this._ttl,
    });
  };
}
