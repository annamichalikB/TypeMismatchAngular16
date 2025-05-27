import {Component, ViewChild} from '@angular/core';
import {CheckboxSettingsControl, EditBoxSettingsControl, SettingsPageControl, SettingsPageControlType} from "./models";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EditBoxSettingsControlComponent} from "./edit-box-settings-control.component";
import {CheckboxSettingsControlComponent} from "./checkbox-settings-control.component";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {CommonModule} from "@angular/common";
import {DynamicSettingsFormUtilitiesService} from "./dynamic-settings-form-utilities.service";

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
export class AppComponent {
    @ViewChild('stepper') stepper: MatStepper;
    formGroup: FormGroup;
    formArray: FormArray;
    settingControlsArray: SettingsPageControl[][] = [];
    formReady = false;

    constructor(private _formBuilder: FormBuilder, private readonly _utilities: DynamicSettingsFormUtilitiesService) {
        this.initialData();
    }

    getSettingsControl(step: number, ctrlNum: number): SettingsPageControl {
        return this.settingControlsArray[step][ctrlNum];
    }

    getControlType(step: number, ctrlNum: number): SettingsPageControlType {
        return this.settingControlsArray[step][ctrlNum].Type;
    }

    private initialData() {

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
        this.formGroup = this._formBuilder.group({
            formArray: this._formBuilder.array([
                this._formBuilder.array([this._utilities.getFormControl(ctrl),
                    this._utilities.getFormControl(chBox)])
            ])
        });

        this.formArray = this.formGroup.get('formArray') as FormArray;
        const firstStep = 0;
        this.settingControlsArray[firstStep] = [];
        this.settingControlsArray[firstStep][0] = ctrl;
        this.settingControlsArray[firstStep][1] = chBox;
        this.formReady = true;
    }


    protected readonly SettingsPageControlType = SettingsPageControlType;
}
