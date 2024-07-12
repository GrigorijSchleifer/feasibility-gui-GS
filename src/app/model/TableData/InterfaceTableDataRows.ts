import { InterfaceListEntry } from '../ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/InterfaceListEntry';

export interface InterfaceTableDataRow {
  id: string
  data: string[]
  hasCheckbox?: boolean
  isCheckboxSelected?: boolean
  isClickable?: boolean
  checkboxColumnIndex?: number
  originalEntry: InterfaceListEntry
}
