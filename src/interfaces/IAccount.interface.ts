import type { AccountType } from '@/enums'

import type { ILabelItem } from './ILabelItem.interface'

export interface IAccount {
  id: string
  labelRaw: string
  labels: ILabelItem[]
  type: AccountType
  login: string
  password: string | null
}
