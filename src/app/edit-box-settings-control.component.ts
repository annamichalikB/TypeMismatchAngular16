import { Component, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EditBoxSettingsControl } from './models';

@Directive()
export abstract class BaseControlComponent
 implements OnInit {
	@Input()
	control: FormControl;

	@Input()
	truncate = false;

	private _initialValue: any;

	ngOnInit(): void {
		this._initialValue = this.control.value;
	}

	get changesMade(): boolean {
		return this._initialValue !== this.control.value;
	}
}

@Component({
  selector: 'app-edit-box-settings-control',
  standalone: true,
  template: `<div>EditBox: {{settingsControl.DisplayName }} </div>	<input matInput [formControl]="control"	/>`
})
export class EditBoxSettingsControlComponent  extends BaseControlComponent implements OnInit, OnDestroy {

	@Input() settingsControl: EditBoxSettingsControl = new EditBoxSettingsControl();

	private _valueChangesSub: Subscription = new Subscription();

	override ngOnInit(): void {
		super.ngOnInit();
		if (this.control && this._valueChangesSub) {
			this._valueChangesSub = this.control.valueChanges.subscribe(val => {
				this.settingsControl.Value = val;
			});
		}
	}

	ngOnDestroy(): void {
		if (this._valueChangesSub) {
			this._valueChangesSub.unsubscribe();
		}
	}
}