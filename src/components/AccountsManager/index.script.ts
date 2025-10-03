import { useAccountsStore } from '@/stores/accounts/index.store'

import { storeToRefs } from 'pinia'

import type { IAccount } from '@/interfaces'

export const useAccountsManagerComponent = () => {
  const store = useAccountsStore()

  const { accounts } = storeToRefs(store)

  const onAddHandler = () => store.addEmpty()

  const onDeleteHandler = (id: string) => store.remove(id)

  const onSaveHandler = (account: IAccount) => store.update(account)

  return {
    accounts,
    onAddHandler,
    onDeleteHandler,
    onSaveHandler,
  }
}
