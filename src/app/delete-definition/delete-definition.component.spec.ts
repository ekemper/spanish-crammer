import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDefinitionComponent } from './delete-definition.component';

describe('DeleteDefinitionComponent', () => {
  let component: DeleteDefinitionComponent;
  let fixture: ComponentFixture<DeleteDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
