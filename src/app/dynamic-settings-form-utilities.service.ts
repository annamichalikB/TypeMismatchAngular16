import {Injectable} from "@angular/core";
import {FormBuilder, FormControl, ValidatorFn} from "@angular/forms";
import {SettingsPageControl, SettingsPageControlType} from "./models";

@Injectable({
    providedIn: 'root'
})
export class DynamicSettingsFormUtilitiesService {

    constructor(private readonly _fb: FormBuilder) {
    }

    /**
     * Gets Form Control
     * @param c Settings Page Control
     */
    getFormControl(c: SettingsPageControl): FormControl {
        const validators: ValidatorFn[] = [];
        switch (c.Type) {
            case SettingsPageControlType.EditBox:
                return this._fb.control(c.Value ?? '', validators);
            case SettingsPageControlType.Checkbox:
                let value = false;
                if (c.Value?.toLowerCase() === 'true') {
                    value = true;
                }
                return this._fb.control(value, validators);
        }
    }
}
