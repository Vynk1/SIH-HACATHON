const Donation = require("../models/Donation");

// middleware first check if user is alumni or not
exports.postDonation = async (req, res) => {
  try {
    const { amount, purpose } = req.body;
    const donation = await Donation.create({
      alumni_id: req.user._id,
      amount,
      purpose,
      payment_status: "success", // for demo; after can work on Razorpay
    });
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// middleware check first the logged in alumni can check only his donation details
exports.getDonationDetails = async (req, res) => {
  try {
    const items = await Donation.find({ alumni_id: req.user._id }).lean();
    const total = items.reduce((sum, d) => sum + d.amount, 0);
    res.json({ total_amount: total, items });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//details seen by admin for all alumni available
exports.getAllAlumniDonation = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("alumni_id", "full_name batch_year")
      .lean();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
