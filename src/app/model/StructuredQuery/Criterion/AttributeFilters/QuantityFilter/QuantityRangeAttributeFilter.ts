import { AbstractQuantityRangeFilter } from '../../Abstract/Quantity/Range/AbstractQuantityRangeFilter';
import { QuantityUnit } from 'src/app/model/StructuredQuery/QuantityUnit';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class QuantityRangeAttributeFilter extends AbstractQuantityRangeFilter {
  private attributeCode: TerminologyCode;

  constructor(
    attributeCode: TerminologyCode,
    minValue: number,
    maxValue: number,
    unit: QuantityUnit
  ) {
    super(minValue, maxValue, unit);
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
}
