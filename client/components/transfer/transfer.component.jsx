import server from '~/src/server'
import { useState } from 'react'
import { getAddress, sign } from '~/lib/wallets.lib'
import { CurrencyDollarIcon } from '@heroicons/react/20/solid'

export function Transfer({
  user,
  setBalance,
  children,
  recipient,
  setRecipient,
}) {
  const [sendAmount, setSendAmount] = useState('')

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
    <section className="mt-10 flex flex-col">
      <h1 className="font-semibold sm:mx-auto sm:w-full sm:max-w-sm">
        Send Transaction
      </h1>
      <form
        className="flex flex-col gap-5 rounded-lg border-2 border-dashed border-gray-300 p-5 sm:mx-auto sm:w-full sm:max-w-sm"
        onSubmit={transfer}
      >
        <div className="flex items-center justify-between">
          Send Amount
          <div className="relative ml-2 mt-2 flex-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <CurrencyDollarIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>

            <input
              placeholder="1, 2, 3..."
              type="number"
              value={sendAmount}
              min={1}
              onChange={setValue(setSendAmount)}
              className="block w-full rounded-md border-0 py-1.5 pl-10  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></input>
          </div>
        </div>

        <div className="mt-2 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              placeholder="Type user"
              value={recipient}
              onChange={setValue(setRecipient)}
              name="email"
              id="email"
              className="block w-full rounded-none rounded-l-md border-0 px-5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {children}
        </div>

        <input
          type="submit"
          value="Transfer"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </form>
    </section>
  )
}
