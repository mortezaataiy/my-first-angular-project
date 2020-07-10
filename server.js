publicModels = null;
var mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const orm = require("orm");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const dbConnectionInfo = require("./config/keys").dbConnectionInfo;
app.use(
  orm.express(dbConnectionInfo, {
    define: function (db, models, next) {
      publicModels = models;
      models.user = db.define("users", {
        id: {
          type: "integer",
          size: 4,
          key: true,
        },
        user_id: {
          type: "text",
          size: 100,
        },
        name: {
          type: "text",
          size: 100,
        },
        pass: {
          type: "text",
          size: 100,
        },
        last_notification_id_viewed: {
          type: "integer",
          size: 4,
          defaultValue: 0,
        },
      });
      models.notification = db.define("notifications", {
        id: {
          type: "integer",
          size: 4,
          key: true,
        },
        u_id: {
          type: "integer",
          size: 4,
        },
        sender_u_id: {
          type: "integer",
          size: 4,
        },
      });
      next();
    },
  })
);

app.use(passport.initialize());
require("./config/passport")(passport);

const users = require("./routers/api/users");
app.use("/api/users", users);
const notifications = require("./routers/api/notifications");
app.use("/api/notifications", notifications);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on ${port}`));
