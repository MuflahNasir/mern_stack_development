const express = require("express")
const router = express.Router();
const auth = require('../../middleware/auth')

//Item Model

const Item = require("../../Models/items")

// @routes GET api/items
// @desc Get all items
// @access Public

router.get("/", (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then((items) => res.json(items))
})

// @routes POST api/items
// @desc Post items
// @access Private

router.post("/", auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save()
        .then((item) => res.json(item))
})

// @routes DELETE api/items
// @desc Delete an items
// @access Private

router.delete("/:id", auth, (req, res) => {
    Item.findById(req.params.id)
        .then((item) => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

// @routes PUT api/users
// @desc Update an item
// @access Private

router.put("/:id", auth, (req, res) => {
    Item.updateOne({_id: req.params.id}, {$set: {name: req.body.name}})
        .then((item) => res.json(item))
        .catch(err => console.log("Couldn't update data", err))
});

module.exports = router;