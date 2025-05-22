import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({template: ''})
export abstract class BaseControlComponent implements OnInit {
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

    protected undoChanges(): void {
        this.control.patchValue(this._initialValue);
        this.control.markAsPristine();
    }
}
