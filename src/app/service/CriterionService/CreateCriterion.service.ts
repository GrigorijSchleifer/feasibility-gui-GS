import { AttributeDefinitions } from 'src/app/model/AttributeDefinitions';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { CriterionHashService } from './CriterionHash.service';
import { CriterionService } from '../CriterionService.service';
import { FeatureService } from '../Feature.service';
import { finalize, of, switchMap, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { QuantityUnit } from 'src/app/model/QuantityUnit';
import { SearchResultListItemSelectionService } from '../ElasticSearch/SearchTermListItemService.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { InterfaceListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/InterfaceListEntry';

@Injectable({
  providedIn: 'root',
})
export class CreateCriterionService {
  ids: Set<string> = new Set<string>();

  constructor(
    private criterionHashService: CriterionHashService,
    private featureService: FeatureService,
    //private UiProfileService: LoadUIProfileService,
    private backend: BackendService,
    private listItemService: SearchResultListItemSelectionService<InterfaceListEntry>,
    private criterionService: CriterionService
  ) {}

  public translateListItemsToCriterions() {
    this.getCriteriaProfileData(this.listItemService.getIds());
  }

  /**
   * @todo check if ids exceed 50 --> if so send second request and so on
   * due to url length
   */
  public getCriteriaProfileData(ids: Array<string>) {
    this.backend
      .getCriteriaProfileData(ids)
      .pipe(
        switchMap((responses: any[]) => {
          const criteriaProfileDataArray = responses.map((response) => {
            const attributeDefinitions: AttributeDefinitions[] = this.mapAttributeDefinitions(
              response.uiProfile
            );
            if (response.uiProfile.valueDefinition) {
              attributeDefinitions.push(this.mapValueDefinition(response.uiProfile));
            }
            const context = this.mapTerminologyCode(response.context);
            const termCodes = response.termCodes.map(this.mapTerminologyCode);
            const id = response.id;
            return new CriteriaProfileData(
              id,
              response.uiProfile.timeRestrictionAllowed,
              attributeDefinitions,
              context,
              termCodes
            );
          });
          return of(criteriaProfileDataArray);
        }),
        finalize(() => {
          this.ids.clear();
          this.listItemService.clearSelection();
        })
      )
      .subscribe(
        (criteriaProfileDataArray: CriteriaProfileData[] | null) => {
          criteriaProfileDataArray.forEach((criteriaProfileData) => {
            this.createCriterionFromProfileData(criteriaProfileData);
          });
          this.ids.clear();
        },
        (error) => {
          console.error('Error fetching criteria profile data:', error);
        }
      );
  }

  private mapAttributeDefinitions(uiProfile: any): AttributeDefinitions[] {
    if (!uiProfile.attributeDefinitions || uiProfile.attributeDefinitions.length === 0) {
      return [];
    }

    return uiProfile.attributeDefinitions.map(
      (attributeDefinition) =>
        new AttributeDefinitions(
          uiProfile.name,
          attributeDefinition.type,
          attributeDefinition.optional,
          attributeDefinition.allowedUnits?.map(
            (unit) => new QuantityUnit(unit.code, unit.display, unit.system)
          ) || [],
          !!uiProfile.valueDefinition,
          attributeDefinition.attributeCode,
          attributeDefinition.max,
          attributeDefinition.min,
          attributeDefinition.precision,
          attributeDefinition.referenceCriteriaSet,
          attributeDefinition.referencedValueSet
        )
    );
  }

  private mapValueDefinition(uiProfile: any): AttributeDefinitions {
    return new AttributeDefinitions(
      uiProfile.name,
      uiProfile.valueDefinition.type,
      uiProfile.valueDefinition.optional,
      uiProfile.valueDefinition.allowedUnits?.map(
        (unit) => new QuantityUnit(unit.code, unit.display, unit.system)
      ) || [],
      true,
      uiProfile.valueDefinition.attributeCode,
      uiProfile.valueDefinition.max,
      uiProfile.valueDefinition.min,
      uiProfile.valueDefinition.precision,
      uiProfile.valueDefinition.referenceCriteriaSet,
      uiProfile.valueDefinition.referencedValueSet
    );
  }

  private mapTerminologyCode(termCode: any): TerminologyCode {
    return new TerminologyCode(termCode.code, termCode.display, termCode.system, termCode.version);
  }

  public createCriterionFromProfileData(criteriaProfileData: CriteriaProfileData): void {
    const mandatoryFields = this.createMandatoryFields(criteriaProfileData);
    const criterionBuilder = new CriterionBuilder(mandatoryFields);

    criteriaProfileData.getAttributeDefinitions().forEach((attributeDefinition) => {
      this.processAttributeDefinition(criterionBuilder, attributeDefinition);
    });

    if (criteriaProfileData.getTimeRestrictionAllowed()) {
      criterionBuilder.withTimeRestriction(criterionBuilder.buildTimeRestriction());
    }
    const criterion = criterionBuilder.buildCriterion();
    this.criterionService.setCriterionByUID(criterion);
  }

  private createMandatoryFields(criteriaProfileData: CriteriaProfileData): {
    context: TerminologyCode
    criterionHash: string
    display: string
    isInvalid: boolean
    uniqueID: string
    termCodes: Array<TerminologyCode>
  } {
    const context = criteriaProfileData.getContext();
    const termCodes = criteriaProfileData.getTermCodes();
    const display = criteriaProfileData.getTermCodes()[0].getDisplay();

    return {
      context,
      criterionHash: this.criterionHashService.createHash(context, termCodes[0]),
      display,
      isInvalid: false,
      uniqueID: uuidv4(),
      termCodes,
    };
  }

  private processAttributeDefinition(
    criterionBuilder: CriterionBuilder,
    attributeDefinition: AttributeDefinitions
  ): void {
    const name = attributeDefinition.getName();
    const code = attributeDefinition.getAttributeCode();
    const type = attributeDefinition.getType();
    const attributeDef = attributeDefinition;

    if (!attributeDefinition.getValueDefinition()) {
      criterionBuilder.withAttributeFilter(
        criterionBuilder.buildAttributeFilter(name, code, type, attributeDef) as AttributeFilter
      );
    } else {
      criterionBuilder.withValueFilters(
        criterionBuilder.buildAttributeFilter(name, code, type, attributeDef) as ValueFilter
      );
    }
  }
}
