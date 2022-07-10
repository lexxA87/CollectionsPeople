const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
// const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Collection = require("../models/Collection");
const ItemCollection = require("../models/ItemCollection");
const Tag = require("../models/Tag");
const Comment = require("../models/Comment");
const Theme = require("../models/Theme");

AdminJS.registerAdapter(require("@adminjs/mongoose"));

const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        // ...your options go here
        listProperties: ["_id", "name", "email", "role", "blocked"],
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
    {
      resource: Theme,
    },
  ],
  branding: {
    companyName: "Admin Collections-People",
  },
  dashboard: {
    component: AdminJS.bundle("../../src/components/adminDashboard/Dashboard"),
  },
  rootPath: "/admin",
});

const router = AdminJSExpress.buildRouter(adminJs);

// const router = AdminJSExpress.buildAuthenticatedRouter(
//   adminJs,
//   {
//     authenticate: async (email, password) => {
//       const user = await User.findOne({ email });
//       if (user) {
//         const matched = await bcrypt.compare(password, user.password);
//         if (matched) {
//           return user;
//         }
//       }
//       return false;
//     },
//     cookiePassword: "secret-password",
//   },
//   null,
//   {
//     resave: false,
//     saveUninitialized: true,
//   }
// );

module.exports = router;
