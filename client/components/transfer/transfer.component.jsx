import server from '~/src/server'
import { useState } from 'react'
import { getAddress, sign } from '~/lib/wallets.lib'

export function Transfer({ user, setBalance }) {
  const [sendAmount, setSendAmount] = useState('')
  const [recipient, setRecipient] = useState('')

  const setValue = (setter) => (evt) => setter(evt.target.value)

  async function transfer(evt) {
    evt.preventDefault()

    const message = {
      amount: parseInt(sendAmount),
      recipient,
    }
    const { signature, publicKey } = sign(user, message)
    const sender = getAddress(user)

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender,
        message,
        signature,
        publicKey,
      })
      setBalance(balance)
    } catch (ex) {
      console.error(ex)
    }
  }

  return (
    <form className="transfer container" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type user"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  )
}
