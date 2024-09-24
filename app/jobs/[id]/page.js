// https://akoskm.com/create-a-job-board-with-nextjs-13-and-airtable/


// import getJobs from "@/services";
// import getJob from "@/services";

// export async function generateStaticParams() {
//   const jobs = await getJobs();

//   return jobs.map((job) => ({
//     id: job.id,
//   }));
// }

// export default async function JobPage({ params: { id } }) {
//   const job = await getJob(id);

//   if (!job) return (<div>Job {id} doesn’t exist</div>);
//   console.log('jobBBB', job)

//   return (
//     <div>
//       <h1>{job.get('Name')}</h1>
//       {/* <p>{job.get('Capsules') && job.get('Capsules')}</p>
//       <p>{job.get('Extract30')}</p>
//       <p>{job.get('Extract100')}</p> */}
//     </div>
//   )
// }