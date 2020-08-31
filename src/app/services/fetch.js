import SEARCH_API_KEY from "../constants/api-constants";

export async function makeHttpRequest(query) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${SEARCH_API_KEY}&cx=017576662512468239146:omuauf_lfve&q=${query}`;

  return new Promise((resolve, reject) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        }, 
        method: "GET"
      }
      fetch(url, options)
        .then(
          res => {
            return res.json();
          }
        )
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error)
        });
    }
    catch (error) {
      reject(error);
    }
  });
}