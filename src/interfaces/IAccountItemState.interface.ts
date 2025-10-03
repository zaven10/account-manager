import type { IAccount } from './IAccount.interface'

export interface IAccountItemState {
  local: IAccount
  errors: Record<string, string | null>
}
