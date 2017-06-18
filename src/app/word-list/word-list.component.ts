import { Component, OnInit } from '@angular/core';

// import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Definition } from '../definition'
// import { EmitterService } from '../../emitter.service';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {

  definitions:Definition[];
  defintionsCount: number;

  constructor(private definitionsService : DefinitionService) {}

  ngOnInit() {
      this.loadDefinitions()
  }

  loadDefinitions() {
    // Get all definitions
    this.definitionsService.getAllDefinitions()
      .subscribe(
          definitions => {
            this.definitions = definitions;
            this.defintionsCount = definitions.length;
            console.log('this.defintionsCount : ' + this.defintionsCount);

          }, //Bind to view
          err => { console.log(err); }
      );
  }

  onInput(event, id){
    console.log('inputed shit :  '  + event.target.outerText, id);
  }

  clearSearchBar(){
      (<HTMLInputElement>document.getElementById("search-bar")).value = '';
  }

  saveEnglish(event, word){
    console.log('saveEnglish:');
    word.english = event.target.outerText.replace(/(\r\n|\n|\r)/gm,"");
    console.log('hitted return kee : ' + JSON.stringify(word,null,4));
    event.target.blur();
    event.target.outerText = word.english;
  }

  saveSpanish(event, word){
    console.log('saveSpanish:');
    word.spanish = event.target.outerText.replace(/(\r\n|\n|\r)/gm,"");
    console.log('hitted return kee : ' + JSON.stringify(word,null,4));
    event.target.blur();
    event.target.outerText = word.spanish;
  }
}
