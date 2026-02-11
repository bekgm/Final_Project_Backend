const mongoose = require('mongoose');
const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const sendEmail = require('../config/mail');

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private
exports.createDonation = async (req, res, next) => {
  try {
    const { amount, campaign, message, isAnonymous } = req.body;

    // Check if campaign exists and is active
    const campaignDoc = await Campaign.findById(campaign);

    if (!campaignDoc) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    if (campaignDoc.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Campaign is not active',
      });
    }

    // Create donation
    const donation = await Donation.create({
      amount,
      campaign,
      donor: req.user.id,
      message,
      isAnonymous: isAnonymous || false,
    });

    // Populate donor and campaign info
    await donation.populate([
      { path: 'donor', select: 'username email' },
      { path: 'campaign', select: 'title' }
    ]);

    // Send thank you email
    try {
      await sendEmail({
        email: donation.donor.email,
        subject: 'Thank You for Your Donation',
        message: `
          <h1>Thank You for Your Generous Donation!</h1>
          <p>Dear ${donation.donor.username},</p>
          <p>Thank you for your donation of $${amount} to the campaign "${donation.campaign.title}".</p>
          <p>Your contribution helps make a real difference and brings us closer to our goal.</p>
          <p>Together, we can create positive change!</p>
          <br>
          <p>Best regards,<br>Charity Platform Team</p>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send donation email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      donation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all donations for logged-in user
// @route   GET /api/donations
// @access  Private
exports.getUserDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ donor: req.user.id })
      .populate('campaign', 'title category goalAmount')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single donation
// @route   GET /api/donations/:id
// @access  Private
exports.getDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donor', 'username email')
      .populate('campaign', 'title description goalAmount');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }

    // Check if user owns this donation or is admin
    if (donation.donor._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this donation',
      });
    }

    res.status(200).json({
      success: true,
      donation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get donations for a specific campaign
// @route   GET /api/donations/campaign/:campaignId
// @access  Public
exports.getCampaignDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ 
      campaign: req.params.campaignId,
      status: 'completed'
    })
      .populate('donor', 'username')
      .sort('-createdAt')
      .limit(50);

    // Hide donor info for anonymous donations
    const sanitizedDonations = donations.map(donation => {
      if (donation.isAnonymous) {
        return {
          ...donation.toObject(),
          donor: { username: 'Anonymous' }
        };
      }
      return donation;
    });

    res.status(200).json({
      success: true,
      count: sanitizedDonations.length,
      donations: sanitizedDonations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete donation (Admin only)
// @route   DELETE /api/donations/:id
// @access  Private (Admin)
exports.deleteDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }

    // Decrease campaign amount if donation was completed
    if (donation.status === 'completed') {
      await Campaign.findByIdAndUpdate(donation.campaign, {
        $inc: { currentAmount: -donation.amount },
      });
    }

    await donation.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Donation deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
