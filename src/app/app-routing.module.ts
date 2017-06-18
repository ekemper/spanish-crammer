import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { WordListComponent } from './word-list/word-list.component';
import { ContentFilterPipe } from './content-filter.pipe';
import { NewDefinitionComponent } from './new-definition/new-definition.component';
import { PracticeComponent } from './practice/practice.component';
import { EditDefinitionComponent } from './edit-definition/edit-definition.component';
import { DeleteDefinitionComponent } from './delete-definition/delete-definition.component';

const appRoutes: Routes = [
  { path: 'new-definition', component: NewDefinitionComponent },
  { path: 'list', component: WordListComponent },
  { path: 'practice', component: PracticeComponent },
  { path: 'edit/:id', component: EditDefinitionComponent},
  { path: 'delete/:id', component: DeleteDefinitionComponent},
  { path: '**', 
    redirectTo: '/list' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}