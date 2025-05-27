import {Component, ViewChild} from '@angular/core';
import {CheckboxSettingsControl, EditBoxSettingsControl, SettingsPageControl, SettingsPageControlType} from "./models";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EditBoxSettingsControlComponent} from "./edit-box-settings-control.component";
import {CheckboxSettingsControlComponent} from "./checkbox-settings-control.component";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {CommonModule} from "@angular/common";
import {DynamicSettingsFormUtilitiesService} from "./dynamic-settings-form-utilities.service";
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        EditBoxSettingsControlComponent,
        ReactiveFormsModule,
        MatStepperModule,
        CheckboxSettingsControlComponent,
        CommonModule,
        HttpClientModule
    ],
    styles: []
})
export class AppComponent {
    @ViewChild('stepper') stepper: MatStepper;
    formGroup: FormGroup;
    formArray: FormArray;
    settingControlsArray: SettingsPageControl[][] = [];

    constructor(private _formBuilder: FormBuilder,
                private readonly _utilities: DynamicSettingsFormUtilitiesService,
                private http: HttpClient) {
        this.loadSettingsControls();
    }

    getSettingsControl(step: number, ctrlNum: number): SettingsPageControl {
        return this.settingControlsArray[step][ctrlNum];
    }

    getControlType(step: number, ctrlNum: number): SettingsPageControlType {
        return this.settingControlsArray[step][ctrlNum].Type;
    }

    private loadSettingsControls() {
        this.http.get<SettingsPageControl[]>('assets/settings-controls.json')
            .subscribe((data: SettingsPageControl[]) => {
                this.createFormFromJson(data);
            });
    }

    private createFormFromJson(data: SettingsPageControl[]) {
        this.settingControlsArray = [];
        const formArraySteps: FormArray[] = [];
        let step = 0;
        let controlsForStep: SettingsPageControl[] = [];
        let formControlsForStep: FormControl[] = [];
        data.forEach((item, idx) => {
            controlsForStep.push(item);
            formControlsForStep.push(this._utilities.getFormControl(item));
            // Example: start new step after 2 controls (customize as needed)
            if ((idx + 1) % 2 === 0 || idx === data.length - 1) {
                this.settingControlsArray[step] = controlsForStep;
                formArraySteps.push(this._formBuilder.array(formControlsForStep));
                step++;
                controlsForStep = [];
                formControlsForStep = [];
            }
        });
        this.formGroup = this._formBuilder.group({
            formArray: this._formBuilder.array(formArraySteps)
        });
        this.formArray = this.formGroup.get('formArray') as FormArray;
    }


    protected readonly SettingsPageControlType = SettingsPageControlType;
}
