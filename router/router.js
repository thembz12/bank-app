const { cardAndCvv } = require("../controller/cardAndCvvController")
const { signUp, allUsers, loginUser, getOneUser, forgetPassword, resetPassword, logOut, changePassword } = require("../controller/controller")
const { comingIn,comingOut } = require("../controller/history")
const { deposit, transfer,createPin, getLoan } = require("../controller/transactionController")
const {authenticate} = require ("../middleware/auth.js")

const router = require("express").Router()


router.post("/signup" , signUp)
router.get("/getalluser", allUsers)
router.post("/login", loginUser)
router.get("/getone/:id", getOneUser)
router.post("/forgetpassword", forgetPassword)
router.post("/resetpassword:token", resetPassword)
router.post("/changepassword:token", changePassword)
router.post("/logout", logOut)
 


router.post("/deposit/:id", deposit)
router.put("/createPin/:id", createPin)

router.post("/transfer/:id",transfer)
router.post("/getLoan/:id", getLoan)

router.post("/comingIn/:id",comingIn)
router.post("/comingOut/:id",comingOut)


router.post("/createCardNumber/:id",cardAndCvv)



module.exports = router
 