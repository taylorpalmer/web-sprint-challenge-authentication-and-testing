const axios = require("axios");
const restrict = require("../auth/restrict");

const router = require("express").Router();

router.get("/", restrict(), async (req, res, next) => {
  const requestOptions = {
    headers: { accept: "application/json" },
  };

  axios
    // @ts-ignore
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then((response) => {
      res.status(200).json(response.data.results);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
});

module.exports = router;
