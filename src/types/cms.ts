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
  icon: string
  text: string
  url: string
  type: 'primary' | 'secondary' | 'tertiary'
  ariaLabel: string
}

export interface ProjectSettings {
  projectType: 'donation' | 'voting'
  overtitle: string
  title: string
  showInPageNav: boolean
  useStandardConfig: boolean
  includePublicProjects: boolean
  includeArchivedProjects: boolean
  redirectToDedicatedPages: boolean
  showSearch: boolean
  showCategoryFilter: boolean
  showStatusFilter: boolean
  initialFilterEndedProjects: boolean
  advancedFilterRules: string
  startView: 'list' | 'map'
  initialSort: 'az' | 'za' | 'newest' | 'oldest' | 'random'
  initialVisibleProjects: number
}

export interface ContentBlockFormValues {
  overtitle?: string
  title: string
  text?: string
  imageUrl?: string
  positioning: ContentBlockPosition
  theme: ContentBlockTheme
  cssClasses?: string
  showInPageNavigation: boolean
  buttons?: ContentBlockButton[]
}

export type ContentBlockPosition = 'text-left' | 'image-left' | 'text-top' | 'image-top'
export type ContentBlockTheme = 'light' | 'dark'

export interface ContentBlockSettings {
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

export interface BaseContentBlock {
  id: string
  name: string
  componentType: string
  order: number
  fixed?: boolean
}

export interface GenericContentBlock extends BaseContentBlock {
  componentType: Exclude<string, 'projects'>
  settings: ContentBlockSettings
}

export interface ProjectContentBlock extends BaseContentBlock {
  componentType: 'projects'
  settings: ProjectSettings
}

export type ContentBlock = GenericContentBlock | ProjectContentBlock
