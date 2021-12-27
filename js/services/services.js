const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

//  async function getResource(url) {   -   разницы нет, можно так записать
const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
         throw new Error(`Could not fech ${url}, status: ${res.status}`);
         // если будет 404 и т.д. fech() не воспримит как ошибку, поэтому прописваем вручную
         // если не будет интернета, ответа от сервера тогда сработает блок catch и все Ok
    }

    return await res.json();
};

export {postData};
export {getResource};