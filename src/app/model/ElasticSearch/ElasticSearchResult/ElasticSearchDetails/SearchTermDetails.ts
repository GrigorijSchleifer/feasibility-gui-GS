import { AbstractSearchResult } from '../AbstractSearchResult';
import { SearchTermRelatives } from './SearchTermRelatives';
import { SearchTermTranslation } from './SearchTermTranslation';

/**
 * Represents detailed information about a search term, extending the AbstractSearchResult class.
 *
 * @see AbstractSearchResult
 */
export class SearchTermDetails extends AbstractSearchResult {
  translations: Array<SearchTermTranslation>;
  parents: SearchTermRelatives[];
  children: SearchTermRelatives[];
  relatedTerms: SearchTermRelatives[];

  /**
   *
   * @param children      - An array of child terms.
   * @param parents       - An array of parent terms.
   * @param relatedTerms  - An array of related terms.
   * @param translations  - An array of term translations.
   * @param availability
   * @param domain
   * @param terminology
   * @param termcode
   * @param kdsModule
   */
  constructor(
    children: Array<SearchTermRelatives>,
    parents: Array<SearchTermRelatives>,
    relatedTerms: Array<SearchTermRelatives>,
    translations: Array<SearchTermTranslation>,
    availability: number,
    domain: string,
    terminology: string,
    termcode: string,
    kdsModule: string,
    name: string,
    contextualizedTermcodeHash: string
  ) {
    super(name, contextualizedTermcodeHash, availability, domain, terminology, termcode, kdsModule);
    this.translations = translations;
    this.parents = parents;
    this.children = children;
    this.relatedTerms = relatedTerms;
  }

  /**
   * Gets the parent terms.
   *
   * @returns An array of parent terms.
   */
  getParents(): SearchTermRelatives[] {
    return this.parents;
  }

  /**
   * Sets the parent terms.
   *
   * @param parents - An array of new parent terms.
   */
  setParents(parents: SearchTermRelatives[]): void {
    this.parents = parents;
  }

  /**
   * Gets the child terms.
   *
   * @returns An array of child terms.
   */
  getChildren(): SearchTermRelatives[] {
    return this.children;
  }

  /**
   * Sets the child terms.
   *
   * @param children - An array of new child terms.
   */
  setChildren(children: SearchTermRelatives[]): void {
    this.children = children;
  }

  /**
   * Gets the related terms.
   *
   * @returns An array of related terms.
   */
  getRelatedTerms(): SearchTermRelatives[] {
    return this.relatedTerms;
  }

  /**
   * Sets the related terms.
   *
   * @param relatedTerms - An array of new related terms.
   */
  setRelatedTerms(relatedTerms: SearchTermRelatives[]): void {
    this.relatedTerms = relatedTerms;
  }
}
