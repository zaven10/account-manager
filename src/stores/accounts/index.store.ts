import { STORAGE_ACCOUNTS, STORAGE_KEY } from '@/constants'

import { AccountType } from '@/enums'

import type { IAccount } from '@/interfaces'

import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useAccountsStore = defineStore(STORAGE_ACCOUNTS, () => {
  const accounts = ref<IAccount[]>([])

  const load = () => {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (raw) {
      try {
        accounts.value = JSON.parse(raw)
      } catch {
        accounts.value = []
      }
    }
  }

  const persist = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value))

  const addEmpty = (): IAccount => {
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `id_${Math.random().toString(36).slice(2, 10)}`

    const account: IAccount = {
      id,
      labelRaw: '',
      labels: [],
      type: AccountType.LDAP,
      login: '',
      password: null,
    }

    accounts.value.push(account)

    persist()

    return account
  }

  const update = (account: IAccount) => {
    const idx = accounts.value.findIndex((a) => a.id === account.id)

    if (idx >= 0) {
      accounts.value[idx] = account

      persist()
    }
  }

  const remove = (id: string) => {
    accounts.value = accounts.value.filter((account) => account.id !== id)

    persist()
  }

  load()

  return { accounts, addEmpty, update, remove, load, persist }
})
