const express = require("express")
const router = express.Router()
const bcryptjs = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const auth = require("../../middleware/auth")

//User Model

const User = require("../../Models/users")

// @route POST /api/auth
// @desc authenticate the user
// @access public

router.post("/", (req, res) => {
   const { email, password } = req.body

   //Simple validation

   if( !email || !password) {
       return res.status(400).json({ msg: "Please enter all fields!!" })
   }

   // Check for existing user

   User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: "User dosen't exists" })

            //Validate Password
            bcryptjs.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: "Incorrect Password" })

                    jwt.sign(
                        { id: user.id },
                        config.get("jetSecret"),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    user: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
})
// @route GET /api/auth
// @desc get user data
// @access Private

router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
})

module.exports = router