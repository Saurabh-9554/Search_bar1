const express = require("express");
const { Client } = require("@elastic/elasticsearch");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const client = new Client({ node: "http://localhost:9200" });

// client
//   .ping(
//     {},
//     {},
//     {
//       requestTimeout: 2000,
//     }
//   )
//   .then((res) => {
//     console.log("res", res);
//   })
//   .catch((err) => {
//     if (err) {
//       console.log("err", err);
//     }
//   });

app.get("/logs", async (req, res) => {
  const { from = 0, size = 10 } = req.query;
  try {
    const { body } = await client.search({
      index: "kibana_sample_data_logs",
      from: parseInt(from, 10) || 0,
      size: parseInt(size, 10) || 10,
      body: {
        query: {
          match_all: {},
        },
      },
    });
    const totalHits = body.hits.total.value; // Total hits for pagination
    const logs = body.hits.hits.map((hit) => ({
      _id: hit._id,
      _type: hit._type,
      ...hit._source,
    })); // Extract _source from hits

    res.json({
      logs,
      total: totalHits,
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
