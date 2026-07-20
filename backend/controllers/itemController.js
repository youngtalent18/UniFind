import Item from "../models/itemModel.js";

export const createItem = async (req, res) => {
  try {
    const { type, title, category, location, date, description } = req.body;
    if (![type, title, category, location, date, description].every(Boolean)) {
      return res.status(400).json({ error: "All report fields are required" });
    }
    const item = await Item.create({ type, title, category, location, date, description, reporter: req.user._id });
    await item.populate("reporter", "fullname profilePic");
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Could not create report" });
  }
};

export const getItems = async (_req, res) => {
  try {
    const items = await Item.find()
      .populate("reporter", "fullname profilePic")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Could not load reports" });
  }
};
