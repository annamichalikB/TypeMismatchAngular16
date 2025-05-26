import {Component, OnInit, ViewChild} from '@angular/core';
import {CheckboxSettingsControl, EditBoxSettingsControl, SettingsPageControl, SettingsPageControlType} from "./models";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EditBoxSettingsControlComponent} from "./edit-box-settings-control.component";
import {CheckboxSettingsControlComponent} from "./checkbox-settings-control.component";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        EditBoxSettingsControlComponent,
        ReactiveFormsModule,
        MatStepperModule,
        CheckboxSettingsControlComponent,
        CommonModule
    ],
    styles: []
})
export class AppComponent implements OnInit {
    @ViewChild('stepper') stepper: MatStepper;
    formGroup: FormGroup;
    formArray: FormArray;
    testControl = this._formBuilder.control('test', []);
    checkBoxControl = this._formBuilder.control(true);
    settingControlsArray: SettingsPageControl[][] = [];

    constructor(private _formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.initialData();
    }

    getSettingsControl(step: number, ctrlNum: number): SettingsPageControl {
        return this.settingControlsArray[step][ctrlNum];
    }

    getControlType(step: number, ctrlNum: number): SettingsPageControlType {
        return this.settingControlsArray[step][ctrlNum].Type;
    }

    private initialData() {
        this.formGroup = this._formBuilder.group({
            formArray: this._formBuilder.array([
                this._formBuilder.array([this.testControl, this.checkBoxControl])
            ])
        });
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
        /*   let ary: FormArray = this._formBuilder.array([]);
           ary.push(this.testControl);
           ary.push(this.checkBoxControl);
           (this.formArray.controls[firstStep] as FormArray).push(ary);*/

        this.settingControlsArray[firstStep] = [];
        this.settingControlsArray[firstStep][0] = ctrl;
        this.settingControlsArray[firstStep][1] = chBox;
    }


    protected readonly SettingsPageControlType = SettingsPageControlType;
}
