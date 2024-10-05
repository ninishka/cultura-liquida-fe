// 'use client'

export const getFn = async params => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  try {
    if (typeof params.url === "string") {
      const response = await fetch(`http://localhost:3000/api/${params.url}`)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('data getFn', data)

      return data
    }
    throw new Error("Invalid QueryKey")
  } catch (e) {
    console.error(e)
  }
}

export default getFn


// response.json() [
//   {
//     _id: '65e355eb6c7591e9d9cd6dff',
//     title: 'Extracto doble de Melena de Leon',
//     image: '/img/Hericium_white.png',
//     description: 'Extractos de Hericium Erinaceus',
//     categoryId: 'extracts',
//     stock: 20,
//     price: 35000,
//     size: '30 ml',
//     itemId: 'hericium-erinaceus'
//   },
//   {
//     _id: '65e353086c7591e9d9cd6dfe',
//     title: 'Extracto doble de Reishi',
//     image: '/img/Ganoderma_white.png',
//     description: 'Extractos de Ganoderma Lucidum',
//     categoryId: 'extracts',
//     stock: 40,
//     price: 35000,
//     size: '30 ml',
//     itemId: 'ganoderma-lucidum'
//   }
// ]