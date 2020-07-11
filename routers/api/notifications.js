const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const orm = require("orm");

//@route    GET /api/notifications/test
//@desc     test
//@access   PUBLIC
router.get("/test", (req, res) => {
  res.send("it work");
});

//@route    POST /api/notifications
//@desc     notifications
//@access   PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200);
    if (req.user) {
      publicModels.notification.find({ u_id: req.user.id }, function (
        err,
        notifications
      ) {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "server error" });
          return;
        }
        res.json({
          success: true,
          notifications,
        });
      });
    }
  }
);

//@route    POST /api/notifications/set_last_notification_id_viewed
//@desc     set_last_notification_id_viewed
//@access   PRIVATE
router.post(
  "/set_last_notification_id_viewed",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200);
    var newValues = req.body;
    if (
      !newValues.last_notification_id_viewed ||
      !parseInt(newValues.last_notification_id_viewed)
    ) {
      res.status(500).json({ last_notification_id_viewed: "IS_NOT_VALID" });
      return;
    }

    if (req.user) {
      publicModels.user.one({ id: req.user.id }, function (err, user) {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "server error" });
          return;
        }
        user.last_notification_id_viewed =
          newValues.last_notification_id_viewed;

        user.save((err, user2) => {
          if (err) {
            console.log(err);
            res.status(500).json({ msg: "server error" });
            return;
          }
          res.json({
            success: true,
            user: {
              id: user2.id,
              last_notification_id_viewed: user2.last_notification_id_viewed,
            },
          });
        });
      });
    }
  }
);

//@route    POST /api/notifications/send_notification
//@desc     send_notification
//@access   PRIVATE
router.post(
  "/send_notification",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200);
    var newValues = req.body;
    if (!req.body.u_id || !parseInt(req.body.u_id)) {
      res.status(500).json({ u_id: "IS_NOT_VALID" });
      return;
    }

    if (req.user) {
      publicModels.notification.create(
        { u_id: req.body.u_id, sender_u_id: req.user.id },
        function (err, notification) {
          if (err) {
            console.log(err);
            res.status(500).json({ msg: "server error" });
            return;
          }
          res.json({
            success: true,
          });
        }
      );
    }
  }
);

module.exports = router;
