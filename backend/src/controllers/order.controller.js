import Order from '../models/order.model.js';

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, canteenId } = req.body;

    const order = await Order.create({
      user: req.user._id,
      canteen: canteenId,
      items,
      totalAmount
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCanteenOrders = async (req, res) => {
  try {
    const orders = await Order.find({ canteen: req.params.canteenId })
      .populate('items.menuItem')
      .populate('user', 'fullName email');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
