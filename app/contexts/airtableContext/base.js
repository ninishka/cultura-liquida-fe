import Airtable from 'airtable';
let base
if (process.env.NODE_ENV === 'development') {
  base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_APP_ID);
} else {
  base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.APP_ID);
}

export default base