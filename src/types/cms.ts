export interface ISelectOption<T = string | number | null> {
  value: T
  label: string
  disabled?: boolean
  icon?: string
}

export interface ComponentType {
  id: string
  name: string
  type: string
  icon: string
}

export interface ContentBlockButton {
  label: string
  url: string
  style: 'primary' | 'secondary' | 'tertiary'
  icon: string
  ariaLabel: string
}

export type ContentBlockPosition = 'text-left' | 'image-left' | 'text-top' | 'image-top'
export type ContentBlockTheme = 'light' | 'dark'

export interface ContentBlockSettings {
  name: string
  overtitle?: string
  title?: string
  text?: string
  imageUrl?: string
  positioning?: ContentBlockPosition
  buttons?: ContentBlockButton[]
  theme?: ContentBlockTheme
  cssClasses?: string
  showInPageNavigation?: boolean
  visible?: boolean
}

export interface ContentBlock {
  id: string
  componentType: string
  order: number
  settings: ContentBlockSettings
  fixed?: boolean
}
