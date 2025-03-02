import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'num-display-criteria',
  templateUrl: './display-criteria.component.html',
  styleUrls: ['./display-criteria.component.scss'],
})
export class DisplayCriteriaComponent implements OnInit, OnDestroy {
  @ViewChild('outlet', { read: ViewContainerRef }) outletRef: ViewContainerRef;
  @ViewChild('content', { read: TemplateRef }) contentRef: TemplateRef<any>;

  @Input() groupType: string;

  @Input() isEditable: boolean;

  criteriaArray$: Observable<string[][]>;
  private querySubscription: Subscription;
  private criteriaSubscription: Subscription;

  constructor(
    private queryService: FeasibilityQueryProviderService,
    public criterionProvider: CriterionProviderService
  ) {}

  ngOnInit() {
    this.criteriaSubscription = this.criterionProvider.getCriterionUIDMap().subscribe(() => {
      this.initialize();
      setTimeout(() => {
        this.rerender();
      }, 50);
    });
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe();
    this.criteriaSubscription?.unsubscribe();
  }

  public rerender() {
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
  }

  initialize(): void {
    if (this.groupType === 'Inclusion') {
      this.criteriaArray$ = this.queryService
        .getActiveFeasibilityQuery()
        .pipe(map((feasibilityQuery) => feasibilityQuery.getInclusionCriteria()));
    }
    if (this.groupType === 'Exclusion') {
      this.criteriaArray$ = this.queryService
        .getActiveFeasibilityQuery()
        .pipe(map((feasibilityQuery) => feasibilityQuery.getExclusionCriteria()));
    }
  }

  getInnerLabelKey(): 'AND' | 'OR' {
    return this.groupType === 'Inclusion' ? 'OR' : 'AND';
  }

  getOuterLabelKey(): 'AND' | 'OR' {
    return this.groupType === 'Exclusion' ? 'OR' : 'AND';
  }

  splitInnerArray(i: number, j: number): void {
    let tempcrit: string[][] = [];

    this.queryService
      .getActiveFeasibilityQuery()
      .subscribe((query: FeasibilityQuery) => {
        if (this.groupType === 'Inclusion') {
          tempcrit = this.splitInnerArray2(query.getInclusionCriteria(), i, j);
        }
        if (this.groupType === 'Exclusion') {
          tempcrit = this.splitInnerArray2(query.getExclusionCriteria(), i, j);
        }
      })
      .unsubscribe();
    if (this.groupType === 'Inclusion') {
      this.queryService.setInclusionCriteria(tempcrit);
    }
    if (this.groupType === 'Exclusion') {
      this.queryService.setExclusionCriteria(tempcrit);
    }
  }

  joinInnerArrays(i: number): void {
    let tempcrit: string[][] = [];

    this.queryService
      .getActiveFeasibilityQuery()
      .subscribe((query: FeasibilityQuery) => {
        if (this.groupType === 'Inclusion') {
          tempcrit = this.joinInnerArrays2(query.getInclusionCriteria(), i);
        }
        if (this.groupType === 'Exclusion') {
          tempcrit = this.joinInnerArrays2(query.getExclusionCriteria(), i);
        }
      })
      .unsubscribe();
    if (this.groupType === 'Inclusion') {
      this.queryService.setInclusionCriteria(tempcrit);
    }
    if (this.groupType === 'Exclusion') {
      this.queryService.setExclusionCriteria(tempcrit);
    }
  }

  public splitInnerArray2(critGroup: string[][], i: number, j: number): string[][] {
    const critGroupTemp: string[][] = [];

    let index = 0;
    critGroup.forEach((subarray) => {
      if (index === i) {
        critGroupTemp.push(subarray.slice(0, j + 1));
        critGroupTemp.push(subarray.slice(j + 1));
      } else {
        critGroupTemp.push(subarray);
      }
      index++;
    });

    return critGroupTemp;
  }

  public joinInnerArrays2(critGroup: string[][], i: number): string[][] {
    const critGroupTemp: string[][] = [];

    let index = 0;
    let subarrayTemp;
    critGroup.forEach((subarray) => {
      if (index === i) {
        subarrayTemp = subarray;
      } else if (index === i + 1) {
        critGroupTemp.push(subarrayTemp.concat(subarray));
      } else {
        critGroupTemp.push(subarray);
      }
      index++;
    });

    return critGroupTemp;
  }
}
