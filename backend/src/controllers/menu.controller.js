import MenuItem from '../models/menu.model.js';
import Canteen from '../models/canteen.model.js';
import CanteenMenu from '../models/menu.model.js';


export const addMenuItem = async (req, res) => {
  try {
    const { canteenId } = req.params;
    const { name, price, description, image, category } = req.body;

    if (!['breakfast', 'lunch', 'chinese', 'specialFood'].includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const canteen = await Canteen.findById(canteenId);
    if (!canteen) return res.status(404).json({ message: 'Canteen not found' });

    if (canteen.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Find or create menu doc
    let menu = await CanteenMenu.findOne({ canteen: canteenId });
    if (!menu) {
      menu = new CanteenMenu({ canteen: canteenId });
    }

    menu[category].push({ name, price, description, image });
    await menu.save();

    res.status(201).json({ message: 'Item added', menu });
  } catch (error) {
    console.error('Failed to add item:', error.response?.data || error.message);

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
export const getMenuByCanteenId = async (req, res) => {
  try {
    const { canteenId } = req.params;

    const menu = await CanteenMenu.findOne({ canteen: canteenId });

    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    res.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};