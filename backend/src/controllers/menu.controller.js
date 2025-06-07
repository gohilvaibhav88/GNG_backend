import MenuItem from '../models/menu.model.js';
import Canteen from '../models/canteen.model.js';

export const addMenuItem = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const { canteenId } = req.params;

    const canteen = await Canteen.findById(canteenId);
    if (!canteen) return res.status(404).json({ message: 'Canteen not found' });

    if (canteen.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this canteen' });
    }

    const menuItem = await MenuItem.create({
      name,
      price,
      description,
      canteen: canteenId
    });

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const menuItem = await MenuItem.findById(itemId).populate('canteen');
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

    if (menuItem.canteen.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(itemId, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
