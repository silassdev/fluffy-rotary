import { MongoClient } from 'mongodb';

class MongoDBClient {
    private static instance: MongoDBClient;
    private client: MongoClient;
    private uri: string;

    private constructor() {
        this.uri = process.env.MONGODB_URI || 'your-default-uri';
        this.client = new MongoClient(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10, // Set pool size as needed
        });
    }

    public static getInstance(): MongoDBClient {
        if (!MongoDBClient.instance) {
            MongoDBClient.instance = new MongoDBClient();
        }
        return MongoDBClient.instance;
    }

    public async connect(): Promise<void> {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
    }

    public getClient(): MongoClient {
        return this.client;
    }

    public async close(): Promise<void> {
        await this.client.close();
    }
}

export default MongoDBClient;