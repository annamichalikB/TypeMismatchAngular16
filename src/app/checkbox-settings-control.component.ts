import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {BaseControlComponent} from "./base-control.component";
import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {CheckboxSettingsControl} from "./models";

@Component({
	selector: 'app-checkbox-settings-control',
	
	standalone: true,
	 imports: [
        ReactiveFormsModule
    ],
    template: `
         <mat-form-field class="w-100">
        <input matInput style="display: none;"/>
        <mat-checkbox
                color="primary"
                [formControl]="control">
            <mat-label>{{settingsControl.DisplayName }}</mat-label>
        </mat-checkbox>
    </mat-form-field>`
})
export class CheckboxSettingsControlComponent extends BaseControlComponent implements OnInit, OnDestroy {

	@Input()
	settingsControl: CheckboxSettingsControl;

	@Input()
	control: FormControl;

	private _valueChangesSub: Subscription;

	ngOnInit(): void {
		super.ngOnInit();
		this.control.patchValue(!!this.control.value);
		this._valueChangesSub = this.control.valueChanges
				.subscribe(val => {
					this.settingsControl.Value = val ? 'true' : 'false';
				});
	}

	ngOnDestroy(): void {
		this._valueChangesSub.unsubscribe();
	}
}
