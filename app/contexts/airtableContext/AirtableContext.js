import { createContext, useContext } from 'react';
import Airtable from 'airtable';

const AirtableContext = createContext();

export const AirtableProvider = ({ children }) => {
  const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_APP_ID);

  async function updateRecord(recordId, updatedFields) {
    try {
      const updatedRecord = await base('Common').update(recordId, updatedFields);
      return updatedRecord;
    } catch (error) {
      throw error;
    }
  }

  async function handleUpdate() {
    const recordId = 'recN4FBmlrGzytpNW'
    const updatedFields = {
      // Name: 'Melena',
      // Capsules: '90',
      // Extract30: '112',
      Extract100: '909'
    };

    try {
      const result = await updateRecord(recordId, updatedFields);
    } catch (error) {
      console.log('error', error)
    }
  }

  async function getRecords() {
    try {
      const records = await base('Common').select({ view: "Grid view"}).all();
      
      if (!records || records.length === 0) {
        throw new Error('No any records in db');
      }

      const processedRecords = records.map(record => ({
        id: record.id,
        name: record.get('Name'),
        capsules: record.get('Capsules'),
        ex30: record.get('Extract30'),
        ex100: record.get('Extract100'),
      }));

      console.log('Received records:', processedRecords);
      return processedRecords;
    } catch (error) {
      console.error('Receiving error:', error);
      throw error;
    }
  }

  return (
    <AirtableContext.Provider value={{ base, handleUpdate, getRecords }}>
      {children}
    </AirtableContext.Provider>
  );
};

export const useAirtable = () => useContext(AirtableContext);
