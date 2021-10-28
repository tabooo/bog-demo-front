import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../_services/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../../_services/global.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    registered = false;
    blockedPanel = false;

    constructor(private apiService: ApiService,
                private fb: FormBuilder,
                private globalService: GlobalService) {
    }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            email: new FormControl('', [Validators.required]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            personalNo: new FormControl('', [Validators.required]),
            accountNumber: new FormControl('', [Validators.required]),
        });
    }

    register() {
        const valid = this.checkValidity(this.registerForm);
        if (!valid) {
            this.globalService.showError('შეავსეთ აუცილებელი ველები');
            return;
        }

        this.blockedPanel = true;
        const formValues = this.registerForm.getRawValue();
        const request = {
            email: formValues.email,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            personalNo: formValues.personalNo,
            accountNumber: formValues.accountNumber,
        };

        this.apiService.register(request).subscribe(response => {
            this.blockedPanel = false;
            if (response.valid) {
                this.registered = true;
            } else {
                this.globalService.showError(response.description);
            }
        }, error => {
            this.blockedPanel = false;
        });
    }

    public checkValidity(form): boolean {
        let valid = true;
        Object.keys(form.controls).forEach((key) => {
            form.controls[key].markAsDirty();
            if (valid) {
                valid = form.controls[key].valid;
            }
        });
        return valid;
    }
}
