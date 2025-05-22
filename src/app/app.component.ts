import {Component, OnInit} from '@angular/core';
import {EditBoxSettingsControl, SettingsPageControl, SettingsPageControlType} from "./models";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EditBoxSettingsControlComponent} from "./edit-box-settings-control.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        EditBoxSettingsControlComponent,
        ReactiveFormsModule
    ],
    styles: []
})
export class AppComponent implements OnInit {
    formGroup = this._formBuilder.group({
        formArray: this._formBuilder.array([
            this._formBuilder.array([])
        ])
    });
    formArray?: FormArray;
    testControl = this._formBuilder.control('test', []);
    settingControlsArray: SettingsPageControl[][] = [];

    constructor(private _formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.initialData();
    }

    getSettingsControl(step: number, ctrlNum: number): SettingsPageControl {
        return this.settingControlsArray[step][ctrlNum];
    }

    private initialData() {
        this.formArray = this.formGroup.get('formArray') as FormArray;
        const ctrl: EditBoxSettingsControl = {
            Type: SettingsPageControlType.EditBox,
            DisplayName: 'Edit  example ',
            Description: ['Unique edit box control'],
            Value: ''
        };

        const firstStep = 0;
        (this.formArray.controls[firstStep] as FormArray).push(this.testControl);
        this.settingControlsArray[firstStep] = [];
        this.settingControlsArray[firstStep][0] = ctrl;
    }


}
