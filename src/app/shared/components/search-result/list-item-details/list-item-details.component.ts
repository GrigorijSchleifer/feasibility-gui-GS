import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { SearchTermRelatives } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermRelatives';
import { CodeableConceptResultListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/CodeableConceptResultListEntry';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/SearchTermListEntry';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { InterfaceResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/InterfaceResultList';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { Entries } from 'src/app/model/ElasticSearch/Entrie';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { SearchResultListItemSelectionService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';

@Component({
  selector: 'num-list-item-details',
  templateUrl: './list-item-details.component.html',
  styleUrls: ['./list-item-details.component.scss'],
})

/**
 * Needs a function to call the elastic search service for fetching the the data when
 * on click of parents/children/siblings
 */
export class ListItemDetailsComponent implements OnInit {
  isOpen = false;

  listItemDetails$: Observable<SearchTermDetails>;

  entries: Observable<Entries>;
  constructor(
    private listItemService: SearchResultListItemSelectionService<SearchTermListEntry>,
    private elasticSearchService: ElasticSearchService<
      CodeableConceptResultList,
      CodeableConceptResultListEntry
    >
  ) {}

  ngOnInit() {
    this.listItemService
      .getSelectedSearchResultListItem()
      .subscribe((selectedRow: SearchTermListEntry) => {
        if (selectedRow) {
          this.elasticSearchService
            .getDetailsForListItem(selectedRow.getId())
            .subscribe((entry: SearchTermDetails) => {
              this.listItemDetails$ = of(entry);
            });
        }
      });
  }

  getSelectedRelative(name: SearchTermRelatives) {}
}
