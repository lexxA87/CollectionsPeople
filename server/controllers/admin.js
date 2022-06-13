const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const User = require("../models/User");

AdminJS.registerAdapter(require("@adminjs/mongoose"));

const adminJs = new AdminJS({
  resources: [User],
  rootPath: "/admin",
});

const router = AdminJSExpress.buildRouter(adminJs);

module.exports = router;
