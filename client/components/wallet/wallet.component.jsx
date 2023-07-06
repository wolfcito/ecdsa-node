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
    <section className="mt-10 flex flex-col">
      <h1 className="font-semibold sm:mx-auto sm:w-full sm:max-w-sm">
        Wallet funds
      </h1>
      <div className="flex flex-col gap-5 rounded-lg border-2 border-dashed border-gray-300 p-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex items-center justify-between">
          Sender Address
          <select
            onChange={onSelectUser}
            value={user}
            className="mt-2 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Choose a user wallet </option>
            {USERS.map((u, i) => (
              <option key={nanoid()} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="balance rounded-sm">Balance: {balance}</div>
      </div>
    </section>
  )
}
