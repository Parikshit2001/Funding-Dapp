const Funder = artifacts.require("Funder");

module.exports = function (deployer) {
  console.log("Starting deployment...");
  deployer
    .deploy(Funder)
    .then(() => {
      console.log("Deployment complete!");
    })
    .catch((err) => {
      console.error("Deployment failed:", err);
    });
};
