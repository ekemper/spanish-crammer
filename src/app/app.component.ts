import { Component } from '@angular/core';
import {DefinitionService} from './definition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DefinitionService]
})
export class AppComponent {
  title = 'app works!';
}
