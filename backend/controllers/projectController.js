const db = require("../models");
const Project = db.project;

const notifications = require("../socketHandlers/issues/newIssues");

const createProject = async (req, res) => {
  const {
    title,
    details,
    clientStatus,
    clientName,
    durationStart,
    durationEnd,
    price,
    clientEmail,
  } = req.body;
  try {
    const newProject = {
      title,
      details,
      status: clientStatus,
      clientName,
      durationStart,
      durationEnd,
      price,
      clientEmail,
      userId: req.params.id,
    };

    const response = await Project.create(newProject);

    if (response) {
      res
        .status(200)
        .json({ message: `Successfully created project ${title}` });
    } else {
      res.status(400).json({ message: "Unable to process your request!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const allProject = async (req, res) => {
  const { role, email, id } = req.query;

  let project;

  if (role === "admin") {
    project = await Project.findAll({
      where: { userId: id },
    });
  } else {
    project = await Project.findAll({
      where: { clientEmail: email },
    });
  }

  try {
    if (project.length > 0) {
      res.status(200).json({ data: project });
    } else {
      res.status(404).json({ message: "records is empty" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleProject = async (req, res) => {
  const { id } = req.params;
  const { role, userId } = req.query;
  try {
    const project = await Project.findByPk(id);
    if (project) {
      res.status(200).json(project);
      if (role === "admin") {
        notifications.assigneeIssueNotification(userId, id);
      } else {
        notifications.reporterIssueNotification(userId, id);
      }
    } else {
      res.status(404).json({ message: "Project cannot be found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProject = async (req, res) => {
  const { list } = req.body;

  try {
    if (list.length <= 0)
      return res.status(400).json({ message: "no selected photos" });
    const project = await Project.destroy({
      where: { id: list },
    });

    if (project) {
      res.status(200).json({ message: "Successfully deleted!" });
    } else {
      res.status(404).json({ message: "This Project cannot or cannot delete" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProject,
  allProject,
  getSingleProject,
  deleteProject,
};
