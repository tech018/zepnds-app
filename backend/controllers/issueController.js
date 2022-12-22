const db = require("../models");
const Issue = db.issue;
const notifications = require("../socketHandlers/issues/newIssues");

const createIssue = async (req, res) => {
  const {
    title,
    assigneeId,
    reporterId,
    details,
    projectId,
    prioLevel,
    status,
    isOpen,
  } = req.body;

  try {
    const newIssue = {
      title,
      assigneeId,
      reporterId,
      details,
      prioLevel,
      projectId,
      status,
      isOpen,
    };

    const response = await Issue.create(newIssue);

    if (response) {
      res.status(200).json({ message: `Successfully created issue ${title}` });
      notifications.assigneeIssueNotification(assigneeId, projectId);
      notifications.reporterIssueNotification(reporterId, projectId);
    } else {
      res.status(401).json({ message: "Unable to process your request!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteIssues = async (req, res) => {
  const { getId, assigneeId, reporterId, projectId } = req.body;

  try {
    if (getId.length <= 0)
      return res.status(400).json({ message: "no selected issues" });
    const issue = await Issue.destroy({
      where: { id: getId },
    });

    if (issue) {
      res.status(200).json({ message: "Successfully deleted!" });
      notifications.assigneeIssueNotification(assigneeId, projectId);
      notifications.reporterIssueNotification(reporterId, projectId);
    } else {
      res.status(404).json({ message: "This Issue cannot or cannot delete" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateIssue = async (req, res) => {
  const { data } = req.body;

  try {
    const update = await Issue.update(data, {
      where: {
        id: req.params.id,
      },
    });

    if (update) {
      res.status(200).json({ message: "Successfully updated", data });
    } else {
      res.status(401).json({ message: "Invalid update" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("error", error);
  }
};

const getSingleIssue = async (req, res) => {
  const { id } = req.params;

  try {
    const issue = await Issue.findByPk(id);
    if (issue) {
      res.status(200).json(issue);
    } else {
      res.status(404).json({ message: "issue cannot be found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createIssue,
  deleteIssues,
  updateIssue,
  getSingleIssue,
};
