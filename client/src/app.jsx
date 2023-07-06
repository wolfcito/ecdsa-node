import { useEffect, useState } from 'react'

import './index.css'
import { Transfer } from '~/components/transfer/transfer.component'
import { Wallet } from '~/components/wallet/wallet.component'
import { Layout } from './layout'
import { WalletIcon } from '@heroicons/react/20/solid'

export default function App() {
  const [balance, setBalance] = useState(0)
  const [user, setUser] = useState('')
  const [open, setOpen] = useState(false)
  const [recipient, setRecipient] = useState('')
  useEffect(() => {
    console.log(recipient)
  }, [recipient])

  return (
    <div className="flex h-screen w-screen flex-col gap-4">
      <Layout open={open} setOpen={setOpen} setRecipient={setRecipient}>
        <Wallet
          balance={balance}
          setBalance={setBalance}
          user={user}
          setUser={setUser}
        />
        <Transfer
          setBalance={setBalance}
          user={user}
          recipient={recipient}
          setRecipient={setRecipient}
        >
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setOpen(!open)}
          >
            <WalletIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            Recipient
          </button>
        </Transfer>
      </Layout>
    </div>
  )
}
