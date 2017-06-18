import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Definition } from '../definition';
import { DefinitionService } from '../definition.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-delete-definition',
  templateUrl: './delete-definition.component.html',
  styleUrls: ['./delete-definition.component.css']
})
export class DeleteDefinitionComponent implements OnInit {

	idString:string;
	definition:Definition;
	// this.definition.english = '';
	// this.definition.spanish = '';

	definitionDeleted : boolean = false;
	private sub: any;
	constructor(private route: ActivatedRoute,
		        private definitionsService : DefinitionService){}

	delete(){
		let definitionOperation:Observable<Definition[]>;
		definitionOperation = this.definitionsService.removeDefinition(this.idString)
		definitionOperation.subscribe(
		    response => {
		        console.log(response);
		        this.definitionDeleted = true;

		        setTimeout(()=>{
		        	this.definitionDeleted = false;
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
		   this.idString = params['id'];

		   this.definitionsService.getDefinitionById(this.idString)
		      .subscribe(
		          definitionObj => {
		          	this.definition = definitionObj; //Bind to view
		            console.log('retrieved definition record to be deleted:'+JSON.stringify(this.definition,null,4));
		          
		          	(<HTMLInputElement>document.getElementById("spanish")).textContent = this.definition.spanish;
	                (<HTMLInputElement>document.getElementById("english")).textContent = this.definition.english;

		          },
		          err => { console.log(err); }
		      );
		});
	}
}
