const express = require('express');
const router = express.Router();

let inventory = [];

router.get('/', (req, res) => {
    res.json(inventory);
});

router.post('/', (req, res) => {
    const { name, quantity } = req.body;
    if (!name || quantity == null) {
        return res.status(400).json({ error: "Name and quantity are required" });
    }
    const newItem = { id: inventory.length + 1, name, quantity };
    inventory.push(newItem);
    res.status(201).json(newItem);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const item = inventory.find(i => i.id == id);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }
    item.name = name || item.name;
    item.quantity = quantity !== undefined ? quantity : item.quantity;
    res.json(item);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    inventory = inventory.filter(i => i.id != id);
    res.json({ message: `Item with ID ${id} deleted` });
});

module.exports = router;
