const express = require("express")
const router = express.Router()
const bcryptjs = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")

//User Model

const User = require("../../Models/users")

// @route POST /api/users
// @desc Register user
// @access public

router.post("/", (req, res) => {
   const { name, email, password } = req.body

   //Simple validation

   if( !name || !email || !password) {
       return res.status(400).json({ msg: "Please fill all fields!!!" })
   }

   // Check for existing user

   User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: "User already exists" })

            const newUser = new User({
                name,
                email,
                password
            })

            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
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
        })
})

module.exports = router