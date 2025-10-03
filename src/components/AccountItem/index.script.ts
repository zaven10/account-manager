import { computed, reactive, watch, type ComputedRef } from 'vue'

import { useValidation } from '@/composables'

import type { IAccount, IAccountItemState } from '@/interfaces'

import { AccountType } from '@/enums'

export interface IAccountItemProps {
  account: IAccount
}

export interface IEmits {
  (e: 'onSave', account: IAccount): void
  (e: 'onDelete', id: string): void
}

export const useAccountItemComponent = ({ account }: IAccountItemProps, emits: IEmits) => {
  const { validate, isValid } = useValidation()

  const state: IAccountItemState = reactive({
    local: { ...account },
    errors: {
      labelRaw: null,
      login: null,
      password: null,
    },
  })

  const accountTypeItems = [
    { text: 'Локальная', value: AccountType.LOCAL },
    { text: 'LDAP', value: AccountType.LDAP },
  ]

  watch(
    () => account,
    (newAccount) => {
      state.local = newAccount
    },
  )

  const isAccountTypeLdap: ComputedRef<boolean> = computed<boolean>(
    () => state.local.type === AccountType.LDAP,
  )

  const onValidateAndSaveHandler = () => {
    state.errors = validate(state.local)

    if (isValid(state.errors)) {
      const payload = {
        ...state.local,
        labels: state.local.labelRaw
          .split(';')
          .map((s) => s.trim())
          .filter(Boolean)
          .map((text) => ({ text })),
        password: isAccountTypeLdap.value ? null : state.local.password,
      }

      emits('onSave', payload)
    }
  }

  const onTypeChangeHandler = () => {
    if (isAccountTypeLdap.value) {
      state.local.password = null
    }

    onValidateAndSaveHandler()
  }

  return {
    state,
    isAccountTypeLdap,
    onValidateAndSaveHandler,
    onTypeChangeHandler,
    accountTypeItems,
  }
}
