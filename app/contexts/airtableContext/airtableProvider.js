import AirtableContext from './airtableContext'
import base from './base'

export const AirtableProvider = ({ children }) => {
  // let base
  // if (process.env.NODE_ENV === 'development') {
  //   base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_APP_ID);
  // } else {
  //   base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.APP_ID);
  // }

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
      // console.error('Receiving error:', error);
      throw error;
    }
  }
  const records = getRecords()

  async function updateRecord(recordId, updatedFields) {
    try {
      const updatedRecord = await base('Common').update(recordId, updatedFields);
      return updatedRecord;
    } catch (error) {
      throw error;
    }
  }

  async function updateMultipleRecords(recordsToUpdate) {
    try {
      const updatePromises = recordsToUpdate.map(async (record) => {
        const { id, capsules, ex30, ex100 } = record;
        const fieldsToUpdate = {};
  
        if (capsules !== undefined) fieldsToUpdate.Capsules = capsules;
        if (ex30 !== undefined) fieldsToUpdate.Extract30 = ex30;
        if (ex100 !== undefined) fieldsToUpdate.Extract100 = ex100;
  
        return await updateRecord(id, fieldsToUpdate);
      });
  
      const updatedRecords = await Promise.all(updatePromises);
      console.log('Successfully updated records:', updatedRecords);
    } catch (error) {
      console.error('Error updating records:', error);
    }
  }
  
  async function handleUpdate(cartItems) {
    // console.log('cartItems', cartItems)
    records.then(items => {
      const filteredItems = items.filter(item => {
        return cartItems.some(cartItem => {
          const itemName = item.name.toLowerCase();
          const cartTitle = cartItem.title.toLowerCase();
          
          return itemName.includes(cartTitle) || cartTitle.includes(itemName);
        });
      });
    
      // console.log('Filtered Items:', filteredItems);
    
      if (filteredItems.length > 0) {
        function createUpdatedItem(originalItem, type, amount) {
          const newItem = { id: originalItem.id }
          
          switch(type) {
            case 'Cápsulas':
              newItem.capsules = String(Math.max(0, parseInt(originalItem.capsules) - amount));
              break;
            case 'Extracto 100ml':
              newItem.ex100 = String(Math.max(0, parseInt(originalItem.ex100) - amount));
              break;
            case 'Extracto 30ml':
              newItem.ex30 = String(Math.max(0, parseInt(originalItem.ex30) - amount));
              break;
            default:
              console.warn(`Unknown type: ${type}`);
          }
          
          return newItem;
        }

        const updatedItems = cartItems.reduce((acc, cartItem) => {
          const matchingItem = filteredItems.find(item => 
            cartItem.title.toLowerCase().includes(item.name.toLowerCase())
          );
          
          if (matchingItem) {
            const updatedItem = createUpdatedItem(matchingItem, cartItem.type, cartItem.amount);
            
            acc.push(updatedItem);
            
            // console.log(`Updated ${cartItem.title}:`);
            // console.log(JSON.stringify(updatedItem, null, 2));
          } else {
            console.warn(`No matching item found for ${cartItem.title}`);
          }
          
          return acc;
        }, []);

        // console.log('All Updated Items:', JSON.stringify(updatedItems, null, 2));
        updateMultipleRecords(updatedItems);

        } else {
          console.log('No matching items found');
        }
      });
  }





  return (
    <AirtableContext.Provider value={{ base, handleUpdate, getRecords, records }}>
      {children}
    </AirtableContext.Provider>
  );
};
