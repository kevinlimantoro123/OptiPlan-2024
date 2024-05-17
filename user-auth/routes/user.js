const express = require(express);

const router = express.Router();

const { register } = require("../controllers/register");

const { login } = require("..controllers/login");

router.post("/register", register); //post req for user registration

router.post("/login", login); //post req for user login

module.exports = router;
//TELLS SERVER TO GO TO THESE ENDPOINTS AND MAKE NECESSAARY REQUESTS
