import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "https://api.gemini.ai/endpoint",
        req.body
      );
      res.status(200).json(response.data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
