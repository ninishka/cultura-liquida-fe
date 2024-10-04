export const postFn = async params => {
  try {
    // console.log("params-", params);
    if (typeof params.url === "string") {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/${params.url}`,
        {
          method: 'POST',
          body: JSON.stringify(params.data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    // console.log("response-", response);

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    }
    throw new Error("Invalid QueryKey")
  } catch (e) {
    console.error(e)
  }
}

export default postFn