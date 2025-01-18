
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
// console.log('MONGODB_URI', MONGODB_URI)

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local',
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}


async function connectToDatabase() {
    if (cached.conn) {
      console.log('Using cached connection');
      return cached.conn;
    }
  
    if (!cached.promise) {
      console.log('Establishing new database connection...');
      const opts = {
        bufferCommands: false,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000,
      };
  
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('Connected to MongoDB successfully');
        return mongoose;
      }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
        throw new Error('Failed to connect to database');
      });

      try {
        cached.conn = await cached.promise;
        return cached.conn;
      } catch (err) {
        console.error('Error in cached connection:', err);
        throw new Error('Connection failed');
      }
  }
}
  
  export default connectToDatabase;

// async function connect() {
//     if (cached.conn) {
//         return cached.conn
//     }
//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: false,
//         }
//         cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
//             console.log('Db connected')
//             return mongoose
//         })
//     }
//     try {
//         cached.conn = await cached.promise
//     } catch (e) {
//         console.log('Db NOT connected')
//         cached.promise = null
//         throw e
//     }

//     return cached.conn
// }

// export default connect