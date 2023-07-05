import { keccak256 } from 'ethereum-cryptography/keccak'
import { hexToBytes, toHex } from 'ethereum-cryptography/utils'
import { secp256k1 } from 'ethereum-cryptography/secp256k1'
import { ACCOUNT_KEYS } from './wallets.data'

// user names derived from the list of accounts
export const USERS = Array.from(ACCOUNT_KEYS.keys())

/**
 * Hash a message using KECCAK-256
 * @param message the message to hash.
 * @returns the hash of the message.
 */
const hashMessage = (message) => keccak256(Uint8Array.from(message))

/**
 * Get the user public key.
 * @param user the user
 * @returns the public key as a Uint8Array.
 */
const getPublicKey = (user) => {
  if (!user) return null

  return hexToBytes(ACCOUNT_KEYS.get(user).public)
  // return ACCOUNT_KEYS.get(user).public
}

/**
 * Get the user private key.
 * @param user the user.
 * @returns the private key as a Uint8Array.
 */
const getPrivateKey = (user) => {
  if (!user) return null

  return hexToBytes(ACCOUNT_KEYS.get(user).private)
}

/**
 * Derive the address from the public key of an user.
 * @param user the user.
 * @returns the user address as a hexa string.
 */
export const getAddress = (user) => {
  if (!user) return null
  const pubKey = getPublicKey(user)
  const hash = keccak256(pubKey.slice(1))
  console.log('pubKey', pubKey)
  console.log('hash', hash)
  console.log(toHex(getPublicKey(user)))
  // return toHex(hash.slice(-20)).toUpperCase()
  return toHex(getPublicKey(user))
}

/**
 * Get the public key of an user in hexa format.
 * @param user the user.
 * @returns the public key.
 */
export const getHexPubKey = (user) => {
  if (!user) return null
  return toHex(getPublicKey(user)).toUpperCase()
}

/**
 * Sign a message.
 * @param username name of the user account.
 * @param message message to sign
 * @returns the signature in hexa format with the recovery bit as the first byte.
 */
export const sign = (username, message) => {
  const privateKey = getPrivateKey(username)
  const hash = hashMessage(message)
  const signature = secp256k1.sign(hash, privateKey)
  const publicKey = toHex(secp256k1.getPublicKey(privateKey))
  console.log('>>>>', secp256k1.verify(signature, hash, publicKey))
  console.log('hash', hash)

  // console.log(signature)
  const fullSignature = new Uint8Array([
    signature.recovery,
    ...signature.toCompactRawBytes(),
  ])
  // console.log('fullSignature', fullSignature)
  // return toHex(fullSignature);

  return {
    signature: toHex(fullSignature),
    publicKey,
  }
}
