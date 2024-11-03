export interface DropdownItem {
  type: 'link' | 'action'
  label: string
  path?: string
  action?: string
}
export type Variants = 'primary' | 'danger' | 'info' | 'success' | 'warning' | 'light'
export type DropDownSides = 'dropLeft' | 'dropRight' | 'dropUp'