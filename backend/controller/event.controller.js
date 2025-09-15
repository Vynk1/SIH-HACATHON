const Event = require("../model/events.model");

exports.postEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      venue: location, // Map location to venue field
      capacity: capacity || null,
      created_by: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event
    });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while creating event" 
    });
  }
};

exports.getEvent = async (_req, res) => {
  try {
    const events = await Event.find()
      .select("title description date venue participants capacity created_by")
      .populate('created_by', 'full_name')
      .sort({ date: 1 })
      .lean();
    
    // Map venue to location for frontend compatibility
    const eventsWithLocation = events.map(event => ({
      ...event,
      location: event.venue
    }));
    
    res.json({ 
      success: true, 
      events: eventsWithLocation 
    });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching events" 
    });
  }
};

exports.postEventPart = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: "Event not found" 
      });
    }

    if (!event.participants.includes(req.user._id)) {
      event.participants.push(req.user._id);
      await event.save();
    }

    res.json({ 
      success: true, 
      message: "Successfully registered for event",
      status: "registered" 
    });
  } catch (err) {
    console.error('Error registering for event:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while registering for event" 
    });
  }
};

// DELETE /events/:id - Delete an event (admin only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: "Event not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Event deleted successfully" 
    });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while deleting event" 
    });
  }
};
