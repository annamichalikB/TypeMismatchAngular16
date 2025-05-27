import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EditBoxSettingsControl } from './models';
import { BaseControlComponent } from './base-control.component';

@Component({
	selector: 'app-edit-box-settings-control',
	standalone: true,
	imports: [
		ReactiveFormsModule
	],
	template: `
		<div>EditBox: {{ settingsControl.DisplayName }}</div>    <input [formControl]="control"/>
		<div>Is numeric: {{ settingsControl.IsNumeric }}</div> `
})
export class EditBoxSettingsControlComponent extends BaseControlComponent implements OnInit, OnDestroy {

	@Input() settingsControl: EditBoxSettingsControl;

	private _valueChangesSub: Subscription;

	override ngOnInit(): void {
		super.ngOnInit();
		this._valueChangesSub = this.control.valueChanges.subscribe(val => {
			this.settingsControl.Value = val;
		});
	}

	ngOnDestroy(): void {
		if (this._valueChangesSub) {
			this._valueChangesSub.unsubscribe();
		}
	}
}
