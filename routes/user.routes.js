const { Router } = require("express");
const User = require("../models/User");
const router = Router();

router.post('/', async (req,res) => {
    const {id} = req.body;
    const user = await new User().findBy('id', id);
    if (user) {
        res.json(user);
    } else {
        return res.status(400).json({
            errors: errors.array(),
            message: "User not found",
          });
    }
})

// router.post('/update', async)

module.exports = router;