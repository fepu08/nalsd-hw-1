import { createClient } from 'redis';

const HOST = process.env.REDIS_HOST || '127.0.0.1';
const PORT = parseInt(process.env.REDIS_PORT!) || 6379;
export const client = createClient({
  url: `redis://${HOST}:${PORT}`,
});

client.on('connect', function () {
  console.log('Redis Database connected');
});

client.on('reconnecting', function () {
  console.log('Redis client reconnecting');
});

client.on('ready', function () {
  console.log('Redis client is ready');
});

client.on('error', function (err) {
  console.log('Something went wrong with Redis ' + err);
});

client.on('end', function () {
  console.log('\nRedis client disconnected');
  console.log('Server is going down now...');
  process.exit();
});

export const connectRedis = async () => {
  await client.connect();
};

export const closeRedis = async () => {
  await client.quit();
};
