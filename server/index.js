const express = require('express')
const cors = require('cors')

const { secp256k1 } = require('ethereum-cryptography/secp256k1')
const { hexToBytes } = require('ethereum-cryptography/utils')
const { keccak256 } = require('ethereum-cryptography/keccak')
const { balances } = require('./data/wallets.data')
const app = express()

const hashMessage = (message) => keccak256(Uint8Array.from(message))

const port = 3042

app.use(cors())
app.use(express.json())

app.get('/balance/:address', (req, res) => {
  const { address } = req.params
  const balance = balances.get(address) || 0

  res.send({ balance })
})

app.post('/send', (req, res) => {
  const { signature, message } = req.body
  const sender = publicKey
  const recipient = message.recipient
  const amount = message.amount

  const messageHash = hashMessage(message)
  const recoveryBit = hexToBytes(signature)[0]
  const signatureBytes = hexToBytes(signature).slice(1)

  const signatureSigned = secp256k1.Signature.fromCompact(signatureBytes)
  signatureSigned.recovery = recoveryBit

  const publicKey = signatureSigned.recoverPublicKey(messageHash).toHex()
  const isSigned = secp256k1.verify(signatureSigned, messageHash, publicKey)

  if (!isSigned) return res.status(400).send({ message: 'Invalid signature' })

  if (publicKey === recipient) {
    return res.status(400).send({ message: 'Invalid transaction' })
  }

  if (balances.get(sender) < amount) {
    res.status(400).send({ message: 'Not enough funds!' })
  }

  balances.set(sender, balances.get(sender) - amount)
  balances.set(recipient, balances.get(recipient) + amount)
  res.send({ balance: balances.get(sender) })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
