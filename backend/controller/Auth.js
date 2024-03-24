const { User } = require('../model/User');

exports.createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const response = await user.save();
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) {
            res.status(401).json('User does not exists');
        }
        else if (user.email === req.body.email && user.password === req.body.password) {
            res.status(200).json({ id: user.id, email: user.email, name: user.name, addresses: user.addresses });
        } else {
            res.status(401).json('Invaild credentials')
        }
    } catch (error) {
        res.status(400).json(error);
    }
}