// import connect from '@/lib/db'

// export async function register() {
//     await connect()
// }


// import connectToDatabase from '@/lib/db';
const connectToDatabase = require('@/lib/db');

export async function register() {
  try {
    await connectToDatabase();
    console.log('Database connected successfully in instrumentation.js');
  } catch (error) {
    console.error('Error connecting to the database in instrumentation.js:', error);
  }
}


// Этот файл может быть полезен для выполнения любых одноразовых операций перед запуском сервера, таких как настройка глобальных переменных, подключений к базам данных или систем логирования.
// подключение к MongoDB будет происходить один раз при инициализации сервера, а затем будет использовано повторно во всех запросах.

