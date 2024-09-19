import { AbstractQuantityComparatorFilter } from '../../Abstract/Quantity/Comparator/AbstractQuantityComparatorFilter';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';
import { QuantityUnit } from 'src/app/model/StructuredQuery/QuantityUnit';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class QuantityComparatorAttributeFilter extends AbstractQuantityComparatorFilter {
  private attributeCode: TerminologyCode;

  constructor(
    attributeCode: TerminologyCode,
    unit: QuantityUnit,
    comparator: QuantityComparisonOption,
    value: number
  ) {
    super(unit, comparator, value);
    this.attributeCode = attributeCode;
  }

  /**
   * Gets the attributeCode value.
   *
   * @returns The attributeCode value.
   */
  public getAttributeCode(): TerminologyCode {
    return this.attributeCode;
  }

  /**
   * Sets the attributeCode value.
   *
   * @param attributeCode - The new attributeCode value to set.
   */
  public setAttributeCode(attributeCode: TerminologyCode): void {
    this.attributeCode = attributeCode;
  }

  public static createFilter(
    attributeCode: TerminologyCode,
    unit: QuantityUnit,
    comparator: QuantityComparisonOption,
    value: number
  ) {
    return new QuantityComparatorAttributeFilter(attributeCode, unit, comparator, value);
  }
}
