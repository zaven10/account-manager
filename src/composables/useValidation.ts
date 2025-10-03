import { AccountType } from '@/enums'

import type { IAccount } from '@/interfaces'

export function useValidation() {
  const validate = (account: IAccount): Record<string, string | null> => {
    const errors: Record<string, string | null> = {
      labelRaw: null,
      login: null,
      password: null,
    }

    // login required
    if (!account?.login?.trim()) {
      errors.login = 'Логин обязателен'
    } else if (account.login.length > 100) {
      errors.login = 'Максимум 100 символов'
    }

    // label optional, max length
    if (account.labelRaw.length > 50) {
      errors.labelRaw = 'Максимум 50 символов'
    }

    // password required only for Локальная
    if (account.type === AccountType.LOCAL) {
      if (!account?.password?.trim()) {
        errors.password = 'Пароль обязателен'
      } else if (account.password.length > 100) {
        errors.password = 'Максимум 100 символов'
      }
    }

    return errors
  }

  const isValid = (errors: Record<string, string | null>) => Object.values(errors).every((e) => !e)

  return { validate, isValid }
}
