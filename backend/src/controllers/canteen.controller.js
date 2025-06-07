import Canteen from '../models/canteen.model.js';

export const createCanteen = async (req, res) => {
  try {
    const {
      canteenName,
      canteenAddress,
      collegeName,
      licenseImage,
      ownerName,
      ownerPhone,
      ownerPhoto,
      canteenPhoto,
      aadharCardNumber
    } = req.body;

    const canteen = await Canteen.create({
      canteenName,
      canteenAddress,
      collegeName,
      licenseImage,
      owner: req.user._id,
      ownerName,
      ownerPhone,
      ownerPhoto,
      canteenPhoto,
      aadharCardNumber
    });

    res.status(201).json(canteen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCanteens = async (req, res) => {
  try {
    const canteens = await Canteen.find();
    res.status(200).json(canteens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getMyCanteen = async (req, res) => {
  try {
    const canteen = await Canteen.findOne({ owner: req.user._id });
    if (!canteen) {
      return res.status(404).json({ message: 'Canteen not found' });
    }
    res.status(200).json(canteen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getCanteenById = async (req, res) => {
  try {
    const { id } = req.params;
    const canteen = await Canteen.findById(id);
    if (!canteen) {
      return res.status(404).json({ message: 'Canteen not found' });
    }
    res.status(200).json(canteen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateCanteen = async (req, res) => {
  try {
    const { id } = req.params;

    const canteen = await Canteen.findById(id);
    if (!canteen) return res.status(404).json({ message: 'Canteen not found' });

    if (canteen.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this canteen' });
    }

    const updatedCanteen = await Canteen.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCanteen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteCanteen = async (req, res) => {
  try {
    const { id } = req.params;

    const canteen = await Canteen.findById(id);
    if (!canteen) return res.status(404).json({ message: 'Canteen not found' });

    if (canteen.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this canteen' });
    }

    await Canteen.findByIdAndDelete(id);
    res.status(200).json({ message: 'Canteen deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
