import axios from "axios";

let PUBLICAPI_KEY = '60cf37a4f1msh07b1cc322753141p156bb4jsn40ea3d8daff9';

export default async function handler(req, res) {
  const options = {
    method: "GET",
    url: `https://hapi-books.p.rapidapi.com/search/${req.query.title}`,
    headers: {
      "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
      "X-RapidAPI-Key": PUBLICAPI_KEY,
    },
  };
  try {
    let response = await axios(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response);
  }
}
