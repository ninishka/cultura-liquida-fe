// https://akoskm.com/create-a-job-board-with-nextjs-13-and-airtable/

// import Airtable from 'airtable'


// const base =  new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}).base(process.env.NEXT_PUBLIC_APP_ID)

// ;['MELENA', 'REISHI', 'COLA'].forEach(i => {
//   base(i).select({ view: "Grid view"}).all((err, records) => {
//     if (!records) return

//     records.forEach(record => {
//       record.get('Name') && console.log(i, record.get('Name'), record.get('Amount'))
//     })
//   })
// })




// let jobs = null

// export default async function getJobs(){
//   return new Promise((resolve, reject) => {
//     base('Common').select({ view: "Grid view" }).all((err, records) => {
//       if (err) reject(err);
//       if (!records) {
//         reject("No records found");
//         return;
//       }

//       // save the fetches records in a local variable
//       // will be useful later
//       jobs = records;
//       resolve(records);
//     });
//   });
// }

// export async function getJob(id) {
//     if (!jobs) {
//       await getJobs();
//     }
  
//     const job = jobs?.find(job => job.id === id);
  
//     return job;
//   }