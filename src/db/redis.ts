import { createClient } from 'redis';

export const client = createClient(
  {
    url: 'redis://default:K8wtFliUhmJIe6yu8r9i4WdaL6hZYVcL@redis-15705.c283.us-east-1-4.ec2.cloud.redislabs.com:15705'
  }
);

// client.on('error', (err) => console.log('Redis Client Error', err));
export const connectToRedis = async (): Promise<any> => {
  try {
    await client.connect();
    console.log('connected to redis')
  } catch (e) {
    console.log(e)
  }
}



// await client.set('key', 'value');
// const value = await client.get('key');