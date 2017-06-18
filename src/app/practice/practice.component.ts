import { Component, OnInit } from '@angular/core';
// import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Definition } from '../definition'
// import { EmitterService } from '../../emitter.service';
import { DefinitionService } from '../definition.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})

export class PracticeComponent implements OnInit {

  definitions:Definition[];	
  randomDefinition:Definition;
  spanishInputValue: string;
  englishInputValue: string;
  
  testingEnglish: boolean;
  testingSpanish: boolean

  match: boolean;
  showNextButton: boolean;
  readyForNext: boolean;
  tryAgainMessage: boolean;

  constructor(private definitionsService : DefinitionService) {}

  ngOnInit() {
  	this.initPractice();
  }

  initPractice(){
  	this.clearInputs();
  	this.loadRandomDefinition();
  	this.chooseEngOrSpan();
  	
    this.testingSpanish = !this.testingEnglish;

  	this.match = false;
  	this.readyForNext = false;
  }

  clearInputs(){
    this.spanishInputValue = '';
    this.englishInputValue = '';
  }

  chooseEngOrSpan(){
  	const rand = this.randomIntFromInterval(0,1);

  	if(rand == 0){
  		this.testingEnglish = true;
  	}else{
  		this.testingEnglish = false;
  	}

  }

  iDontKnow(){
  	this.readyForNext = true;

  	this.testingSpanish = false;
  	this.testingEnglish = false;
  }

  checkForMatch(){
    
    let testValue,knownValue;

    if( this.testingSpanish ){

      testValue = this.spanishInputValue;
      knownValue = this.randomDefinition.spanish;

    }else if(this.testingEnglish){

      testValue = this.englishInputValue;
      knownValue = this.randomDefinition.english;

    }else{
      throw new Error('... dont know what language to match to ... you crazy...');
    }


    if(testValue.toLowerCase() === knownValue){
      this.match = true;
      this.handleMatch();
    }else{
      this.showTryAgainMessage();
    }

  }



  showTryAgainMessage(){

      this.tryAgainMessage = true;

      setTimeout(()=>{
        this.tryAgainMessage = false;
      },2000);
  }

  handleMatch(){
  	this.readyForNext = true;
    this.testingSpanish = false;
    this.testingEnglish = false;
  }

  loadRandomDefinition(){
  	this.definitionsService.getAllDefinitions()
      .subscribe(
          definitions => {
          	
          	this.definitions = definitions;

          	const definitionCount = this.definitions.length;

          	const randomNumber = this.randomIntFromInterval(0,definitionCount);

          	this.randomDefinition = this.definitions[randomNumber];

          	console.log('random definition: ' + JSON.stringify(this.randomDefinition,null,4));

          }, //Bind to view

          err => { console.log(err); }
      );
  }

  randomIntFromInterval(min,max){
	    return Math.floor(Math.random()*(max-min+1)+min);
  }

  onEnter(){
    
    if( this.testingEnglish || this.testingSpanish ){

      this.checkForMatch();
    
    }else if( this.readyForNext ) {
      this.initPractice();
    }else{
        throw new Error('unhandled case of onEnter...');
        
    }    

  }

}
