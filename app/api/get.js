// 'use client'

console.log('getFn')
export const getFn = async params => {
  console.log('params', params)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log('API URL:', apiUrl);
  
  try {
    if (typeof params.url === "string") {
      const response = await fetch(
        `${apiUrl}/api/${params.url}`
      )
    // console.log("response-", response);

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json(); // Сохраняем результат в переменной
      console.log('response.json()', data); // Используем переменную для логирования

      return data; // Возвращаем данные
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