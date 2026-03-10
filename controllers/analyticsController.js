const Message = require("../models/Message");

exports.getAnalytics = async (req, res) => {

  try {

    const totalMessages = await Message.countDocuments();

    const categoryCounts = await Message.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    const dailyCounts = await Message.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalMessages,
      categoryCounts,
      dailyCounts
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};