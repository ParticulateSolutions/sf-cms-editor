import { getCurrentInstance } from "vue"

export type CmsEditorTranslations = typeof de

export const de = {
  general: {
    unnamed: 'Unbenannt',
    save: 'Speichern',
    dash: '-'
  },
  componentPalette: {
    availableElements: 'Verfügbare Elemente'
  },
  contentBlock: {
    unknownBlockType: 'Unbekannter Blocktyp'
  },
  contentBlockEdit: {
    overtitle: 'Vortitel',
    title: 'Überschrift 1',
    text: 'Text',
    image: 'Bild',
    positioning: 'Anordnung',
    buttons: 'Buttons',
    color: 'Farbe',
    cssClasses: 'Ergänzende CSS-Klassen',
    showInPageNav: 'Im Seitenmenü listen',
    positionTextLeft: 'Text links, Bild rechts',
    positionImageLeft: 'Bild links, Text rechts',
    positionTextTop: 'Text oben, Bild unten',
    positionImageTop: 'Bild oben, Text unten',
    themeLight: 'Heller Hintergrund mit dunkler Schrift',
    themeDark: 'Dunkler Hintergrund mit heller Schrift'
  },
  buttonTable: {
    addButton: 'Button hinzufügen',
    icon: 'Icon',
    buttonText: 'Buttontext',
    url: 'URL',
    buttonType: 'Buttontyp',
    ariaLabel: 'Aria-Label'
  },
  metadataPanel: {
    metaTitle: 'Meta-/SEO-Titel',
    metaDescription: 'Meta-/SEO-Beschreibung',
    ogImage: 'Open Graph Image (OG-Bild)',
    indexingAllowed: 'Indexierung erlauben',
    tags: 'Tags',
    metaTitleMaxLength: 'Der Meta-Titel darf maximal 60 Zeichen lang sein.'
  },
  projectExplore: {
    projectType: 'Art der Projekte',
    donationProjects: 'Spendenprojekte',
    votingProjects: 'Votingprojekte',
    view: 'Ansicht',
    listView: 'Listenansicht',
    mapView: 'Kartenansicht',
    sort: 'Sortierung',
    sortAZ: 'A-Z',
    sortZA: 'Z-A',
    sortNewest: 'Neuste',
    sortOldest: 'Älteste',
    sortRandom: 'Zufällig',
    configuration: 'Konfiguration',
    useStandardConfig: 'Standardkonfiguration verwenden',
    projectSelection: 'Projektauswahl und Verhalten',
    includePublicProjects: 'Öffentliche Projekte inkludieren',
    includeArchivedProjects: 'Archivierte Projekte inkludieren',
    redirectToDedicatedPages: 'Weiterleitung auf dedizierte Projektseiten aktivieren',
    visibleFiltering: 'Sichtbare Filterung',
    showSearch: 'Suche anzeigen',
    showCategoryFilter: 'Kategoriefilter anzeigen',
    showStatusFilter: 'Statusfilter anzeigen',
    invisibleFiltering: 'Unsichtbare Filterung',
    initialFilterEndedProjects: 'Beendete Projekte initial herausfiltern',
    advancedFilterRules: 'Erweiterte Filterregeln',
    startView: 'Startansicht',
    initialSort: 'Initiale Listensortierung',
    initialVisibleProjects: 'Anzahl initial sichtbarer Projekte'
  }
}

export const en = {
  general: {
    unnamed: 'Unnamed',
    save: 'Save',
    dash: '-'
  },
  componentPalette: {
    availableElements: 'Available Elements'
  },
  contentBlock: {
    unknownBlockType: 'Unknown Block Type'
  },
  contentBlockEdit: {
    overtitle: 'Overtitle',
    title: 'Heading 1',
    text: 'Text',
    image: 'Image',
    positioning: 'Positioning',
    buttons: 'Buttons',
    color: 'Color',
    cssClasses: 'Additional CSS Classes',
    showInPageNav: 'Show in Page Navigation',
    positionTextLeft: 'Text left, Image right',
    positionImageLeft: 'Image left, Text right',
    positionTextTop: 'Text top, Image bottom',
    positionImageTop: 'Image top, Text bottom',
    themeLight: 'Light background with dark text',
    themeDark: 'Dark background with light text'
  },
  buttonTable: {
    addButton: 'Add Button',
    icon: 'Icon',
    buttonText: 'Button Text',
    url: 'URL',
    buttonType: 'Button Type',
    ariaLabel: 'Aria Label'
  },
  metadataPanel: {
    metaTitle: 'Meta/SEO Title',
    metaDescription: 'Meta/SEO Description',
    ogImage: 'Open Graph Image (OG Image)',
    indexingAllowed: 'Allow Indexing',
    tags: 'Tags',
    metaTitleMaxLength: 'The meta title must not exceed 60 characters.'
  },
  projectExplore: {
    projectType: 'Project Type',
    donationProjects: 'Donation Projects',
    votingProjects: 'Voting Projects',
    view: 'View',
    listView: 'List View',
    mapView: 'Map View',
    sort: 'Sorting',
    sortAZ: 'A-Z',
    sortZA: 'Z-A',
    sortNewest: 'Newest',
    sortOldest: 'Oldest',
    sortRandom: 'Random',
    configuration: 'Configuration',
    useStandardConfig: 'Use Standard Configuration',
    projectSelection: 'Project Selection and Behavior',
    includePublicProjects: 'Include Public Projects',
    includeArchivedProjects: 'Include Archived Projects',
    redirectToDedicatedPages: 'Enable Redirection to Dedicated Project Pages',
    visibleFiltering: 'Visible Filtering',
    showSearch: 'Show Search',
    showCategoryFilter: 'Show Category Filter',
    showStatusFilter: 'Show Status Filter',
    invisibleFiltering: 'Invisible Filtering',
    initialFilterEndedProjects: 'Initially Filter Out Ended Projects',
    advancedFilterRules: 'Advanced Filter Rules',
    startView: 'Start View',
    initialSort: 'Initial List Sorting',
    initialVisibleProjects: 'Number of Initially Visible Projects'
  }
}

export const defaultTranslations = {
  de,
  en
}

/**
 * Safe wrapper for useI18n that provides fallback translations
 * if vue-i18n is not set up in the parent app
 */
export function useSafeI18n() {
  console.log("Hallo?")
  const instance = getCurrentInstance();
  let t: ((key: string) => string) | null = null
  
  // 1. Check if the plugin is registered via the global proxy ($t)
  // This is the most reliable check for Vue 3 plugins in a component context.
  if (instance?.proxy?.$t) {
    t = instance.proxy.$t.bind(instance.proxy);
  } 
  
  // 2. Secondary check: Look into appContext for global properties
  // Useful if useSafeI18n is called in a way where the proxy isn't fully ready
  else if (instance?.appContext.config.globalProperties.$t) {
    t = instance.appContext.config.globalProperties.$t;
  }
  
  // Fallback to German translations if vue-i18n is not available
  if (!t) {
    console.warn(
      '@particulatesolutions/cms-editor: vue-i18n is not installed or not set up with app.use(). ' +
      'Using German fallback translations. ' +
      'For full i18n support, install vue-i18n and set it up in your app. ' +
      'See documentation for details.'
    )
    t = (key: string) => {
      const keys = key.split('.')
      let value: unknown = de
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = (value as Record<string, unknown>)[k]
        } else {
          return key
        }
      }
      return typeof value === 'string' ? value : key
    }
  }
  
  return { t: t! }
}
