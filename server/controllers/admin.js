const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const User = require("../models/User");
const Collection = require("../models/Collection");
const ItemCollection = require("../models/ItemCollection");
const Tag = require("../models/Tag");
const Comment = require("../models/Comment");

AdminJS.registerAdapter(require("@adminjs/mongoose"));

const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        // ...your options go here
        listProperties: ["_id", "name", "email", "role"],
      },
    },
    {
      resource: Collection,
    },
    {
      resource: ItemCollection,
    },
    {
      resource: Tag,
    },
    {
      resource: Comment,
    },
  ],
  branding: {
    companyName: "Admin Collections-People",
  },
  dashboard: {
    component: AdminJS.bundle(
      "../../src/components/adminDashboard/Dashboard.jsx"
    ),
  },
  rootPath: "/admin",
});

const router = AdminJSExpress.buildRouter(adminJs);

module.exports = router;
