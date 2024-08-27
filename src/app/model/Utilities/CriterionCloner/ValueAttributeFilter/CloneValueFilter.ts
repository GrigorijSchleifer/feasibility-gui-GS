import { CloneConceptFilter } from './Concept/CloneConceptFilter';
import { CloneQuantityFilter } from './Quantity/CloneQuantityFilter';
import { CloneReferenceFilter } from './ReferenceFilter/CloneReferenceFilter';
import { ConceptFilter } from '../../../FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { ReferenceFilter } from '../../../FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter';
import { ValueFilter } from '../../../FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';

export class CloneValueFilter {
  static deepCopyValueFilters(valueFilters: ValueFilter[]): ValueFilter[] {
    return valueFilters.map((valueFilter) => this.deepCopyValueFilter(valueFilter));
  }

  /**
   * Creates a deep copy of an ValueFilter instance.
   *
   * @param valueFilters - The ValueFilter instance to deep copy.
   * @returns A new ValueFilter instance that is a deep copy of the given instance.
   */
  static deepCopyValueFilter(valueFilter: ValueFilter): ValueFilter {
    if (!(valueFilter instanceof ValueFilter)) {
      throw new Error('Invalid instance type for deep copy');
    }

    const copiedConceptFilter = valueFilter.isConceptSet()
      ? this.copyConceptFilter(valueFilter.getConcept())
      : undefined;

    const copiedQuantityFilter = valueFilter.isQuantitySet()
      ? CloneQuantityFilter.deepCopyQuantityFilters(valueFilter.getQuantity())
      : undefined;

    const copiedReferenceFilter = valueFilter.isReferenceSet()
      ? this.copyRefrenceFilter(valueFilter.getReference())
      : undefined;

    return new ValueFilter(
      valueFilter.getDisplay(),
      valueFilter.getFilterType(),
      copiedConceptFilter,
      copiedQuantityFilter,
      valueFilter.getOptional()
    );
  }

  static copyRefrenceFilter(referenceFilter: ReferenceFilter): ReferenceFilter {
    return CloneReferenceFilter.deepCopyReferenceFilter(referenceFilter);
  }

  static copyConceptFilter(conceptFilter: ConceptFilter): ConceptFilter | undefined {
    return conceptFilter ? CloneConceptFilter.deepCopyConceptFilter(conceptFilter) : undefined;
  }
}
