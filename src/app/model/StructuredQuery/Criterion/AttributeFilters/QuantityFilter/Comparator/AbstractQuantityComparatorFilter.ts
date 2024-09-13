import { AbstractQuantityFilter } from '../AbstractQuantityFilter';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';
import { QuantityUnit } from 'src/app/model/StructuredQuery/QuantityUnit';

/**
 * Class for quantity comparator filters in a structured query.
 *
 * This class extends AbstractQuantityFilter to add a comparator,
 * type, and value specific to quantity comparisons.
 */
export abstract class AbstractQuantityComparatorFilter extends AbstractQuantityFilter {
  private comparator: QuantityComparisonOption = QuantityComparisonOption.NONE;
  protected type: FilterTypes = FilterTypes.QUANTITY_COMPARATOR;
  private value: number = null;

  /**
   * Constructor to initialize the QuantityComparatorFilter with unit, comparator, type, and value.
   *
   * @param unit - The unit for the filter.
   * @param comparator - The comparator option for the filter.
   * @param value - The value to be compared.
   */
  constructor(unit: QuantityUnit, comparator: QuantityComparisonOption, value: number) {
    super(unit);
    this.comparator = comparator;
    this.value = value;
  }

  /**
   * Gets the comparator value.
   *
   * @returns The comparator value.
   */
  public getComparator(): QuantityComparisonOption {
    return this.comparator;
  }

  /**
   * Sets the comparator value.
   *
   * @param comparator - The new comparator value to set.
   */
  public setComparator(comparator: QuantityComparisonOption): void {
    this.comparator = comparator;
  }

  /**
   * Gets the value.
   *
   * @returns The value.
   */
  public getValue(): number {
    return this.value;
  }

  /**
   * Sets the value.
   *
   * @param value - The new value to set.
   */
  public setValue(value: number): void {
    this.value = value;
  }

  /**
   * Gets the type of the filter.
   *
   * @returns The type of filter.
   */
  public getType(): FilterTypes {
    return this.type;
  }
}
