const Event = require("../model/events.model");

exports.postEvent = async (req, res) => {
  try {
    const { title, description, date, venue } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      venue,
      created_by: req.user._id,
    });
    res.status(201).json({msg: "Event created successfully"});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEvent = async (_req, res) => {
  try {
    const events = await Event.find()
      .select("title description date venue participants")
      .lean();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.postEventPart = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.participants.includes(req.user._id)) {
      event.participants.push(req.user._id);
      await event.save();
    }

    res.json({ status: "registered" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
