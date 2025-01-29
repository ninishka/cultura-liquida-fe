export const fetcher = async (method, path, body, action) => {
  try {
    const response = await fetch(path, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    if (!response.ok) {
      console.error(`Error to ${action}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    console.log(`Success to ${action}`/*, response*/);
    return response;
  } catch (err) {
    console.error(`Error during fetch ( ${action} ): ${err.message}`);
    throw err;
  }
};
