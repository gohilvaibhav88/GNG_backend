import { Tiffin } from '../models/tiffin.model.js';

export const addTiffin = async (req, res) => {
  const tiffin = await Tiffin.create({ ...req.body, owner: req.user._id });
  res.status(201).json(tiffin);
};

export const getAllTiffins = async (req, res) => {
  const { page = 1, limit = 5, search = '' } = req.query;
  const query = search ? { name: new RegExp(search, 'i') } : {};
  const total = await Tiffin.countDocuments(query);
  const data = await Tiffin.find(query).skip((page - 1) * limit).limit(Number(limit));
  res.json({ total, page: +page, limit: +limit, data });
};

export const getTiffinById = async (req, res) => {
  const tiffin = await Tiffin.findById(req.params.id);
  res.json(tiffin);
};

export const updateTiffin = async (req, res) => {
  const tiffin = await Tiffin.findById(req.params.id);
  if (!tiffin || !tiffin.owner.equals(req.user._id))
    return res.status(403).json({ message: 'Unauthorized' });

  const updated = await Tiffin.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteTiffin = async (req, res) => {
  const tiffin = await Tiffin.findById(req.params.id);
  if (!tiffin || !tiffin.owner.equals(req.user._id))
    return res.status(403).json({ message: 'Unauthorized' });

  await Tiffin.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
