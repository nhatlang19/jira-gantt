const express = require("express");
const { getEpics, getIssueInEpic } = require("../services/Epic");
const filterEpics = require("../filter/epics");
const filterStory = require("../filter/story");
const router = express.Router();

// Home page route.
router.get("/", async function (req, res) {
  const epics = await getEpics()
  res.json(filterEpics(epics));
});

router.get("/:epicId", async function (req, res) {
  const epics = await getIssueInEpic(req.params.epicId)
  res.json(filterStory(epics));
});


module.exports = router;