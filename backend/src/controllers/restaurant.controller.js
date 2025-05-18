import { Restaurant } from '../models/restaurant.model.js';

export const addRestaurant = async (req, res) => {
  const restaurant = await Restaurant.create({ ...req.body, owner: req.user._id });
  res.status(201).json(restaurant);
};

export const getAllRestaurants = async (req, res) => {
  const { page = 1, limit = 5, search = '' } = req.query;
  const query = search ? { name: new RegExp(search, 'i') } : {};
  const total = await Restaurant.countDocuments(query);
  const data = await Restaurant.find(query).skip((page - 1) * limit).limit(Number(limit));
  res.json({ total, page: +page, limit: +limit, data });
};

export const getRestaurantById = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.json(restaurant);
};

export const updateRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant || !restaurant.owner.equals(req.user._id))
    return res.status(403).json({ message: 'Unauthorized' });

  const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant || !restaurant.owner.equals(req.user._id))
    return res.status(403).json({ message: 'Unauthorized' });

  await Restaurant.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
