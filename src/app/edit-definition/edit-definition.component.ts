import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Definition } from '../definition'
// import { EmitterService } from '../../emitter.service';
import { DefinitionService } from '../definition.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-edit-definition',
  templateUrl: './edit-definition.component.html',
  styleUrls: ['./edit-definition.component.css']
})
export class EditDefinitionComponent implements OnInit {

	id:string;
	definition:Definition;
	private sub: any;

	definitionForm : FormGroup;
	definitionUpdated : boolean = false;

	constructor(private route: ActivatedRoute,
		        private definitionsService : DefinitionService, 
    	        fb: FormBuilder){
		this.definitionForm = fb.group({
    		'english':"",
    		'spanish':""
    	})
	}

	private model = new Definition();

    submitForm(value: any){
	    console.log('value:' + value);
	    this.saveDefinition(value)
	}

	saveDefinition(value){
        
		this.model.spanish = (<HTMLInputElement>document.getElementById("spanishInput")).value;
		this.model.english = (<HTMLInputElement>document.getElementById("englishInput")).value;
		this.model._id = this.id;

		console.log('this.model.spanish : ' + this.model.spanish);
		console.log('this.model.english : ' + this.model.english);

        let definitionOperation:Observable<Definition[]>;

        definitionOperation = this.definitionsService.updateDefinition(this.model)
        
        definitionOperation.subscribe(
            response => {
                console.log(response);
                this.definitionUpdated = true;

                setTimeout(()=>{
                	this.definitionUpdated = false;
                },2000);

				// this.router.navigate(['/']);
            }, 
            err => {
                throw new Error(err);
            }
        );
    }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
		   // this.id = +params['id']; // (+) converts string 'id' to a number

		   this.id = params['id'];
		   console.log('typeof this.id: ' + typeof this.id);

		   this.definitionsService.getDefinitionById(this.id)
		      .subscribe(
		          definitionObj => {

		          	this.definition = definitionObj; //Bind to view

		          	console.log('retrieved for editing, definitionObj: ' + JSON.stringify(definitionObj,null,4));

		          	(<HTMLInputElement>document.getElementById("spanishInput")).value = this.definition.spanish;
	                (<HTMLInputElement>document.getElementById("englishInput")).value = this.definition.english;

	                document.getElementById("spanishInput").focus();
		          },
		          err => { console.log(err); }
		      );

		});
	}

	ngOnDestroy() {
	    this.sub.unsubscribe();
	}
}
