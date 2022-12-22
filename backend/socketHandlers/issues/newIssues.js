const db = require("../../models");
const Issue = db.issue;
const serverStore = require("../../serverStore");

const assigneeIssueNotification = async (userId, projectId) => {
  try {
    const issues = await Issue.findAll({
      where: {
        assigneeId: userId,
        projectId,
      },
    });

    const receiverList = serverStore.getActiveConnections(Number(userId));

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("assignee-issues", {
        assigneeIssues: issues ? issues : [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const reporterIssueNotification = async (userId, projectId) => {
  try {
    const issues = await Issue.findAll({
      where: {
        reporterId: userId,
        projectId,
      },
    });

    const receiverList = serverStore.getActiveConnections(Number(userId));

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("reporter-issues", {
        reporterIssues: issues ? issues : [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  assigneeIssueNotification,
  reporterIssueNotification,
};
