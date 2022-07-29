#!/usr/bin/env node

import yargs from 'yargs'
import fetch from 'node-fetch'

const ID_LENGTH = 9

const { argv } = yargs(process.argv.slice(2)).options({'mmr': {
  describe: 'Get player MMR by ID',
  type: 'string',
  demandOption: 'Provide an ID',
  default: '124795730'
}})

const { mmr } = argv

const reg = new RegExp(`^[0-9]{${ID_LENGTH}}$`)

  if (!reg.test(mmr)) {
    console.error('Invalid ID number')
    process.exit(1)
  }


try {
  console.log(`Getting MMR...`)
  const response = await fetch(`https://api.opendota.com/api/players/${mmr}`)
  const { mmr_estimate, profile } = await response.json()

  if (!mmr_estimate.estimate){
    console.error('Player not found')
    process.exit(1)
  }

  console.log(`
  Username: ${profile.personaname}
  MMR: ${mmr_estimate.estimate}
  Steam profile: ${profile.profileurl}\n`)
} catch (error) {
  console.error('Something went wrong, try again later')
  process.exit(1)
}