// const googleRoutes = require("express").Router();
// const passport = require("passport");

// googleRoutes.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // googleRoutes.get("/auth/google/callback", passport.authenticate("google"));

// googleRoutes.get("/auth/google/callback", (req, res, next) => {
//   passport.authenticate("google", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.redirect("/login");
//     }
    
//     // Capture userType from query parameters
//     const { userType } = req.query;
    
//     // You can now use userType for further processing or save it to the user's session
    
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       // Redirect to your client application with userType if needed
//       return res.redirect(`http://localhost:3000/dashboard`);
//     });
//   })(req, res, next);
// });


// googleRoutes.get("/auth/status", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.status(200).json({ user: req.user });
//   } else {
//     res.status(401).json({ user: null });
//   }
// });

// googleRoutes.get("/google-user", (req, res) => {
//   res.send(req.user);
//   // console.log("current-user",req.user);
// });

// googleRoutes.get("/google-logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.send({ message: "Logged out successfully" });
//   });
// });

// module.exports = googleRoutes;

const googleRoutes = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');

googleRoutes.get(
  "/auth/google",
  (req, res, next) => {
    const userType = req.query.userType;
    req.session.userType = userType; 
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
  }
);

googleRoutes.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
  const user = req.user;
  console.log(user);
  user.userType = req.session.userType; 

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      userType: "user"
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.redirect(`http://localhost:3000/auth/google/callback?token=${token}&email=${user.email}&name=${user.name}&userType=${"user"}`);
});

googleRoutes.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

googleRoutes.get("/google-user", (req, res) => {
  res.send(req.user);
});

googleRoutes.get("/google-logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send({ message: "Logged out successfully" });
  });
});

module.exports = googleRoutes;