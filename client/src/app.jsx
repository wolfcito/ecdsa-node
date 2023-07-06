import { useState } from 'react'

import './App.scss'
import { Transfer } from '~/components/transfer/transfer.component'
import { Wallet } from '~/components/wallet/wallet.component'

export default function App() {
  const [balance, setBalance] = useState(0)
  const [user, setUser] = useState('')

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        user={user}
        setUser={setUser}
      />
      <Transfer setBalance={setBalance} user={user} />
    </div>
  )
}
