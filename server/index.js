const express = require('express')
const app = express()
const cors = require('cors')
const port = 3042

app.use(cors())
app.use(express.json())

const balances = {
  '03ebf37e0adb62505ceb4bc9e38a16367392db2df28bf4aa98d84864ce835bf07d': 100,
  '03d42c89f68e90a859b008163411de1c8a87dbd656e75ddd4743f049ab0b88dbe3': 50,
  '02f2abb44e4007d3c4bee785c6bcd5734632e0f2ee867d6e22b84e00a3fa49eb75': 75,
}

app.get('/balance/:address', (req, res) => {
  const { address } = req.params
  const balance = balances[address] || 0
  res.send({ balance })
})

app.post('/send', (req, res) => {
  const { sender, recipient, amount } = req.body

  setInitialBalance(sender)
  setInitialBalance(recipient)

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' })
  } else {
    balances[sender] -= amount
    balances[recipient] += amount
    res.send({ balance: balances[sender] })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0
  }
}
