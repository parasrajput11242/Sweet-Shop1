import mongoose from "mongoose";
import Sweet from "../models/Sweet.js";


export const getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sweets" });
  }
};


export const addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ message: "Failed to add sweet" });
  }
};


export const updateSweet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Sweet ID is required" });
    }


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Sweet ID" });
    }

    const sweet = await Sweet.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

  
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: "Failed to update sweet" });
  }
};

export const deleteSweet = async (req, res) => {
  // console.log("delete")
  try {
    const { id } = req.params;
    // console.log(id);
    if (!id) {
      return res.status(400).json({ message: "Sweet ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Sweet ID" });
    }

    const sweet = await Sweet.findByIdAndDelete(id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json({ message: "Sweet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete sweet" });
  }
};


export const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Sweet ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Sweet ID" });
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: "Failed to purchase sweet" });
  }
};