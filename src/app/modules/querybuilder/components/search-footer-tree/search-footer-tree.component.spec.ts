import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchFooterTreeComponent } from './search-footer-tree.component'
import { MaterialModule } from '../../../../layout/material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonComponent } from '../../../../shared/components/button/button.component'

describe('SearchFooterTreeComponent', () => {
  let component: SearchFooterTreeComponent
  let fixture: ComponentFixture<SearchFooterTreeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFooterTreeComponent, ButtonComponent],
      imports: [
        MaterialModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFooterTreeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fire addEvent with true', () => {
    spyOn(component.addEvent, 'emit')

    // trigger the click
    const nativeElement = fixture.nativeElement
    const button = nativeElement.querySelector('#test1-add')
    button.dispatchEvent(new Event('click'))

    expect(component.addEvent.emit).toHaveBeenCalledWith(true)
  })

  it('should fire addEvent with true', () => {
    spyOn(component.addEvent, 'emit')

    // trigger the click
    const nativeElement = fixture.nativeElement
    const button = nativeElement.querySelector('#test2-cancel')
    button.dispatchEvent(new Event('click'))

    expect(component.addEvent.emit).toHaveBeenCalledWith(false)
  })
})
