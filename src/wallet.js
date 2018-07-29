
import crypto from 'crypto'

import bip39 from 'bip39'
import bcorejs from 'bcorejs'

angular.module('wallet', [])
  .factory('wallet', () => {

    return {
      mnemonicToData: (passphrase) => {
        if (!passphrase) {
          passphrase = bip39.generateMnemonic()
        }

        let networks = bcorejs.networks
        let ecpair = bcorejs.ECPair.fromSeed(passphrase, networks.bex)

        let publicKey = ecpair.getPublicKeyBuffer().toString('hex')
        let address = ecpair.getAddress().toString('hex')
        let wif = ecpair.toWIF()

        return {
          passphrase,
          passphraseqr: '{"passphrase":"'+passphrase+'"}',
          address: address,
          addressqr: '{"a":"'+address+'"}',
          publicKey: publicKey,
          wif: wif,
          entropy: bip39.mnemonicToEntropy(passphrase),
        }
      },
      validateMnemonic: (mnemonic) => {
        return bip39.validateMnemonic(mnemonic)
      },
      randomBytes: crypto.randomBytes,
      entropyToMnemonic: bip39.entropyToMnemonic
    }
  })
