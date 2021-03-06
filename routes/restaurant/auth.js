const Restaurant = require("../../models/Restaurant");

const register = async (req, res, next) => {
  const { email, password, username } = req.body;
  const newRestaurant = new Restaurant({
    email: email,
    password: password,
    username: username,
  });

  try {
    await newRestaurant.save();

    next();
  } catch (err) {
    const error = err.keyValue;
    return res.json(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const restaurant = await Restaurant.findOne({ email: email });

    if (!restaurant) return res.json("User not found");
    if (password !== restaurant.password)
      return res.json("Wrong email or password");
    req.user = restaurant;
    next();
  } catch (error) {
    return res.json("error");
  }
};

module.exports = { register, login };
