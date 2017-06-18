import { Component, OnInit } from '@angular/core';

// import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Definition } from '../definition'
// import { EmitterService } from '../../emitter.service';
import { DefinitionService } from '../definition.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-new-definition',
  templateUrl: './new-definition.component.html',
  styleUrls: ['./new-definition.component.css']
})
export class NewDefinitionComponent implements OnInit {

	definitionForm : FormGroup;
	newDefinitionSaved : boolean = false;

    constructor(private definitionsService : DefinitionService, 
    	        fb: FormBuilder/*,
    	        private router: AppRoutingModule*/) { 
    	this.definitionForm = fb.group({
    		'english':"",
    		'spanish':""
    	})
    }

    private model = new Definition();

    submitForm(value: any){
	    this.saveDefinition(value)
	}

	saveDefinition(value){
        
		this.model.english = value.english;
		this.model.spanish = value.spanish;

        let definitionOperation:Observable<Definition[]>;

        definitionOperation = this.definitionsService.addDefinition(this.model)
        
        definitionOperation.subscribe(
            response => {
                this.newDefinitionSaved = true;

                setTimeout(()=>{
                	this.newDefinitionSaved = false;
                },2000);

                (<HTMLInputElement>document.getElementById("spanishInput")).value = '';
                (<HTMLInputElement>document.getElementById("englishInput")).value = '';

                document.getElementById("spanishInput").focus();
				// this.router.navigate(['/']);
            }, 
            err => {
                throw new Error(err);
            }
        );
    }

	ngOnInit() {
	}
}
