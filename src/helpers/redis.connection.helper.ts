import { createClient } from 'redis';
import { BaseException } from '../exceptions/base.exceptions';

const client = createClient()

const checkRedisConnection = async (): Promise<void> => {
    try {
        client.connect();
        
        client.on('error', err => {
            console.log('Redis Client Error', err) 
        }
        );
        client.on('ready', () => {
            console.log('REDIS is running !!!');
        })
    } catch (error) {
        throw new BaseException(500, `Redis Client Error: ${error}`)
    }
    
}


export {
    checkRedisConnection,
    client
}