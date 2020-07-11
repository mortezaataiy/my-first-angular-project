const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const orm = require("orm");
//@route    GET /api/users/test
//@desc     test
//@access   PUBLIC
router.get("/test", (req, res) => {
  res.send("it work");
});

//@route    POST /api/users/login
//@desc     login
//@access   PUBLIC
router.post("/login", (req, res) => {
  res.status(200);
  if (!req.body.userId) {
    res.json({ userId: "IS_NOT_VALID" });
    return;
  } else if (!req.body.pass) {
    res.json({ pass: "IS_NOT_VALID" });
    return;
  } else {
    publicModels.user.one(
      {
        user_id: req.body.userId,
        pass: req.body.pass,
      },
      (err, user) => {
        if (err || !user) {
          res.send({
            success: false,
            user: "NOT_FOUND",
          });
          return;
        }
        var token = jwt.sign({ id: user.id }, keys.secretOrKey, {}, function (
          err2,
          token
        ) {
          if (err2) throw err2;
          res.send({
            success: true,
            user: { id: user.id, user_id: user.user_id, name: user.name },
            token: "Bearer " + token,
          });
        });
      }
    );
  }
});

//@route    POST /api/users/current
//@desc     current
//@access   PRIVATE
router.post(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200);
    if (req.user) {
      var user = req.user;
      res.json({
        success: true,
        user: {
          id: user.id,
          user_id: user.user_id,
          name: user.name,
          last_notification_id_viewed: user.last_notification_id_viewed,
        },
      });
    } else {
      res.status(400).json({ user: "not found" });
    }
  }
);

//@route    POST /api/users/update
//@desc     update
//@access   PRIVATE
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200);
    var newValues = req.body;

    if (req.user) {
      publicModels.user.one({ id: req.user.id }, function (err, user) {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "server error" });
          return;
        }
        if (newValues.name) {
          user.name = newValues.name;
        }

        user.save((err, user2) => {
          if (err) {
            console.log(err);
            res.status(500).json({ msg: "server error" });
            return;
          }
          res.json({
            success: true,
            user: { id: user2.id, user_id: user2.user_id, name: user2.name },
          });
        });
      });
    }
  }
);

//@route    POST /api/users/search
//@desc     search
//@access   PRIVATE
router.post(
  "/search",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200);
    if (!req.body.text) {
      console.log(req.body);
      res.status(400).json({ text: "IS_EMPTY" });
      return;
    }
    publicModels.user.find(
      {
        or: [
          { user_id: req.body.text },
          { name: orm.like(req.body.text + "%") },
        ],
      },
      function (err, users) {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "server error" });
          return;
        }
        res.json({
          success: true,
          users: users.map((u) => ({
            id: u.id,
            name: u.name,
            user_id: u.user_id,
          })),
        });
      }
    );
  }
);

module.exports = router;
