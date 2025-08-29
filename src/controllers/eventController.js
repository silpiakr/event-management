const Event = require("../models/eventModel");

// Create Event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, organizerName } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      organizerName,
      eventBanner: req.file ? req.file.path : null,
      createdBy: req.user.id,
    });

    await newEvent.save();
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get All Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, organizerName } = req.body;
    const updateData = { title, description, date, time, location, organizerName };
    if (req.file) updateData.eventBanner = req.file.path;

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedEvent) return res.status(404).json({ success: false, message: "Event not found" });

    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ success: false, message: "Event not found" });
    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
