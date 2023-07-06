import server from '~/src/server'
import { USERS, getAddress } from '~/lib/wallets.lib'
import { nanoid } from 'nanoid'

export function Wallet({ balance, setBalance, user, setUser }) {
  async function onSelectUser(evt) {
    const selectedUser = evt.target.value
    setUser(selectedUser)

    if (selectedUser) {
      const address = getAddress(selectedUser)
      const {
        data: { balance },
      } = await server.get(`balance/${address}`)

      setBalance(balance)
    } else {
      setBalance(0)
    }
  }

  return (
    <div className="wallet container">
      <h1>Select your wallet</h1>

      <label>
        Wallet Address
        <select onChange={onSelectUser} value={user} className="balance">
          <option value="">--- please choose a user wallet ---</option>
          {USERS.map((u, i) => (
            <option key={nanoid()} value={u}>
              {u}
            </option>
          ))}
        </select>
      </label>

      <div className="balance rounded-sm">Balance: {balance}</div>
    </div>
  )
}
