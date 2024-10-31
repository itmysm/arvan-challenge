export interface DropdownItem {
  type: 'link' | 'action'
  label: string
  path?: string
  action?: string
}
