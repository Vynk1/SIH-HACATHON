const Donation = require("../model/donation.model");

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
    res.status(201).json({
      success: true,
      message: "Donation submitted successfully",
      donation
    });
  } catch (err) {
    console.error('Donation creation error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to submit donation" 
    });
  }
};

// middleware check first the logged in alumni can check only his donation details
exports.getDonationDetails = async (req, res) => {
  try {
    const donations = await Donation.find({ alumni_id: req.user._id }).lean();
    // Map payment_status to status for frontend compatibility
    const formattedDonations = donations.map(donation => ({
      ...donation,
      status: donation.payment_status,
      createdAt: donation.date
    }));
    const total = donations.reduce((sum, d) => sum + d.amount, 0);
    res.json({ 
      success: true,
      donations: formattedDonations,
      total_amount: total 
    });
  } catch (err) {
    console.error('Get donations error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch donations" 
    });
  }
};

//details seen by admin for all alumni available
exports.getAllAlumniDonation = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("alumni_id", "full_name batch_year")
      .lean();
    // Map payment_status to status for frontend compatibility
    const formattedDonations = donations.map(donation => ({
      ...donation,
      status: donation.payment_status,
      createdAt: donation.date
    }));
    res.json({
      success: true,
      donations: formattedDonations
    });
  } catch (err) {
    console.error('Get all donations error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch donations" 
    });
  }
};
