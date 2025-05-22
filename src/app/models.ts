
export abstract class SettingsPageControl {
	abstract Type: SettingsPageControlType;
	DisplayName: string;
	Description: string[];
	DescriptionHTML: string;
	Value: string;

}

export enum SettingsPageControlType {
	EditBox,
	Checkbox,
}

/**
 * Edit Box Settings Control
 */
export class EditBoxSettingsControl extends SettingsPageControl {
	Type: SettingsPageControlType = SettingsPageControlType.EditBox;
	IsNumeric: boolean;
	Textarea: boolean;
}