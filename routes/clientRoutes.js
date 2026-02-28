const authMiddleware = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// Create New ISO Application
router.post("/apply", async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json({ message: "Application Submitted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Applications (Admin)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// Update Client Status
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client Not Found" });
    }

    res.json({
      message: "Status Updated Successfully",
      updatedClient
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Client
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);

    if (!deletedClient) {
      return res.status(404).json({ message: "Client Not Found" });
    }

    res.json({ message: "Client Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});