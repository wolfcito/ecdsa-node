import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { WALLET_REGISTERED } from '~/data/wallets.data'

export function Layout({ children, open, setOpen, setRecipient }) {
  return (
    <>
      {children}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            Select recipient
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-gray-200">
                        <div className="px-6">
                          <nav
                            className="-mb-px flex space-x-6"
                            x-descriptions="Tab component"
                          >
                            {tabs.map((tab) => (
                              <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                  tab.current
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                  'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>
                      <ul
                        role="list"
                        className="flex-1 divide-y divide-gray-200 overflow-y-auto"
                      >
                        {WALLET_REGISTERED.map((person) => (
                          <li
                            key={person.handle}
                            onClick={() => {
                              setRecipient(person.public)
                              setOpen(false)
                            }}
                          >
                            <div className="group relative flex items-center px-5 py-6">
                              <a
                                href={person.href}
                                className="-m-1 block flex-1 p-1"
                              >
                                <div
                                  className="absolute inset-0 group-hover:bg-gray-50"
                                  aria-hidden="true"
                                />
                                <div className="relative flex min-w-0 flex-1 items-center">
                                  <span className="relative inline-block flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full"
                                      src={person.imageUrl}
                                      alt=""
                                    />
                                    <span
                                      className={classNames(
                                        person.status === 'online'
                                          ? 'bg-green-400'
                                          : 'bg-gray-300',
                                        'absolute right-0 top-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white'
                                      )}
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <div className="ml-4 truncate">
                                    <p className="truncate text-sm font-medium text-gray-900">
                                      {person.name}
                                    </p>
                                    <p className="truncate text-sm text-gray-500">
                                      {formarAddress(person.public)}
                                    </p>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

const formarAddress = (address) => {
  return `Address: ${address.slice(0, 8) + '...' + address.slice(-8)}`
}

const tabs = [{ name: 'Wallets registered', href: '#', current: true }]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
