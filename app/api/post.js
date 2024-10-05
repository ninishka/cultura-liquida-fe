console.log('postFn')

export const postFn = async params => {
  try {
    console.log("params-", params);
    if (typeof params.url === "string") {
      const response = await fetch(`http://localhost:3000/api/${params.url}`, {
          method: 'POST',
          body: JSON.stringify(params.data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    console.log("response-", response);

      // if (!response.ok) {
      //   throw new Error('Network response was not ok')
      // }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status} data: ${JSON.stringify(errorData)}`);
      }
      return response.json()
    }
    throw new Error("Invalid QueryKey")
  } catch (e) {
    console.error(e)
  }
}

export default postFn