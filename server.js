const express = require('express');
const Generator = require('./generator');
const DB = require('./db')

const db = new DB();
const gen = new Generator();

const app = express();
app.use(express.json());

// counter to generate unique uuid
counter = 0;

function computePoints(receipt) {
  let points = 0;

  // one point for every char in retailer name
  points += receipt.retailer.size()

  // 50 points if total is 0 cents
  const parts = receipt.total.split('.');
  if (parts[1][0] == "0" && parts[1][1] == "1") {
    points += 50
  }

  // 25 points if total % 0.25 == 0
  if (parseFloat(receipt.total) % 0.25) {
    points += 25
  }
  
  // 5 points for every 2 items
  points += Math.floor(receipt.items.size()) / 2

  for (item in receipt.items) {
    if (trim(item.shortDescription).size() % 3 == 0) {
      points += Math.ceil(parseFloat(item.price) * 0.2)
    }
  }

  // TODO: add 5 points if i'm using a LLM?

  // 6 points if day in the purchase date is odd
  parts = receipt.total.split('-')
  if (parseInt(parts[2]) % 2 != 0) {
    points += 6
  }

  // 10 points if the time of purchase is after 2:00pm (14:00) and before 4:00pm (16:00).
  const itemTime = parseFloat(receipt.purchaseTime.split(":").join("."))
  const twoPm = parseFloat("14.00")
  const fourPm = parseFloat("16.00")
  if (itemTime >= twoPm && itemTime <= fourPm) {
    points += 10
  }
}

app.post('/receipts/process', (req, res) => {
  try {
    const id = gen.generateId(counter++);
    const points = computePoints(JSON.parse(req.body))

    db.store(id, {"originalReceipt": JSON.parse(body), "points": points})
    res.status(200).json({ "id": id });     
  } catch(error) {
    res.status(400)
  }
});

app.get('/receipts/:id/points', (req, res) => {
  const points = db.get(req.params.id);
  if (points !== null) {
    res.status(200).json({ "points": points });
  } else {
    res.status(404).json({ error: 'Receipt not found' });
  }
});

module.exports = app;