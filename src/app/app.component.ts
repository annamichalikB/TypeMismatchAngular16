import {Component, OnInit} from '@angular/core';
import {CheckboxSettingsControl, EditBoxSettingsControl, SettingsPageControl, SettingsPageControlType} from "./models";
import {FormArray, FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {EditBoxSettingsControlComponent} from "./edit-box-settings-control.component";
import {CheckboxSettingsControlComponent} from "./checkbox-settings-control.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        EditBoxSettingsControlComponent,
        ReactiveFormsModule,
        CheckboxSettingsControlComponent
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
    checkBoxControl = this._formBuilder.control('true', []);
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
            DisplayName: 'Edit example ',
            Description: ['Unique edit box control'],
            Value: ''
        };
        const chBox: CheckboxSettingsControl = {
            Type: SettingsPageControlType.Checkbox,
            DisplayName: 'Check box example ',
            Description: ['For dynamically create a checkbox'],
            Value: 'false'
        }
        const firstStep = 0;
        (this.formArray.controls[firstStep] as FormArray).push(this.testControl);
        this.settingControlsArray[firstStep] = [];
        this.settingControlsArray[firstStep][0] = ctrl;
        this.settingControlsArray[firstStep][1] = chBox;
    }


}
