import config from "../../config";
import axios from "axios";

export default async function handler(req, res) {
  try {
    const { type } = req.query;
    const url =
      config.movieDBAPIUrl +
      "/genre/" +
      type +
      "/list?api_key=" +
      config.movieDBKey;
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!!!" });
  }
}
