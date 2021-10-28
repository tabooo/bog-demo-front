import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../_services/api.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Table} from 'primeng/table';
import {LazyLoadEvent} from 'primeng/api';
import {ProductDto} from '../../_model/ProductDto';
import {GlobalService} from '../../_services/global.service';
import {UserDTO} from '../../_model/UserDTO';
import {decode} from '../../_helper/json-util';
import {AuthenticationService} from '../../_services/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {FileUpload} from 'primeng/fileupload';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild('table', {static: false}) table: Table;
    user: UserDTO;
    products: any = {count: 0, products: []};
    searchRequest: any = {
        firstResult: 0,
        limit: 10,
        name: '',
    };

    searchForm: FormGroup;
    curProduct: ProductDto;

    displayProductModal = false;
    productAddForm: FormGroup;
    blockedPanel = false;
    uploadedFiles = [];

    displayProductPayModal = false;
    productPayForm: FormGroup;

    constructor(private apiService: ApiService,
                private fb: FormBuilder,
                private globalService: GlobalService,
                private authenticationService: AuthenticationService,
                private activatedRoute: ActivatedRoute,
                private domSanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.user = decode(localStorage.getItem(this.authenticationService.LOCAL_STORAGE_KEY));

        this.searchForm = this.fb.group({
            name: new FormControl(),
        });

        this.productAddForm = this.fb.group({
            name: new FormControl(),
            quantity: new FormControl(),
            price: new FormControl(),
            photo: new FormControl(),
        });

        this.productPayForm = this.fb.group({
            quantity: new FormControl(),
            cardInfo: new FormControl(),
        });

        this.activatedRoute.queryParams.subscribe(params => {
            if (params.name) {
                this.searchRequest.name = params.name;
                this.searchForm.patchValue({
                    name: params.name
                });
            }
            if (params.firstResult) {
                this.searchRequest.firstResult = params.firstResult;
            }
            if (params.limit) {
                this.searchRequest.limit = params.limit;
            }
        });
    }

    ngAfterViewInit() {
        this.search(null, this.searchRequest);
    }

    search(event: LazyLoadEvent, req) {
        const formValues = this.searchForm.getRawValue();
        if (event == null) {
            this.table._first = this.searchRequest.firstResult;
            if (req == null) {
                this.table._first = 0;
                this.searchRequest.firstResult = 0;

                this.searchRequest.name = formValues.name ? formValues.name : '';
            }
        } else {
            this.searchRequest.firstResult = event.first;
        }

        const params = {
            firstResult: this.searchRequest.firstResult,
            limit: this.searchRequest.limit,
            name: this.searchRequest.name,
        };
        this.globalService.createUrl(['/main/dashboard'], params);

        this.globalService.onBlockUI(true);
        this.apiService.searchProducts(this.searchRequest).subscribe(response => {
            this.products = response;
            this.globalService.onBlockUI(false);
        }, error => {
            this.globalService.onBlockUI(false);
            this.globalService.showError(error.error.message);
        });
    }

    openProductMoodal(product: any) {
        if (product == null) {
            this.curProduct = null;
            this.productAddForm.reset();
            this.displayProductModal = true;
        } else {
            this.curProduct = product;
            this.productAddForm.patchValue({
                name: product.name,
                quantity: product.quantity,
                price: product.price,
            });
            if (product.file) {
                this.uploadedFiles.push(product.file);
            }
            this.displayProductModal = true;
        }
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

    uploadFile(event: any, fileUploadButton: FileUpload): void {
        if (this.uploadedFiles.length > 0) {
            return;
        }
        const file = event.files[0];

        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('fileTypeId', '2');

        this.apiService.fileUpload(formData).subscribe(response => {
            if (!response.valid) {
                this.globalService.showError(response.description);
            } else {
                this.uploadedFiles.push(response.added);
                fileUploadButton.clear();
                fileUploadButton.disabled = true;
            }
        }, error => {
            fileUploadButton.clear();
            fileUploadButton.disabled = false;
            this.globalService.showError('ფაილის ატვირთვის დროს მოხდა შეცდომა');
        });
    }

    removeDebtBillingFile(file: any) {
        this.uploadedFiles.forEach((item, index) => {
            if (item.id === file.id) {
                this.uploadedFiles.splice(index, 1);
            }
        });
    }

    saveProduct() {
        this.blockedPanel = true;
        const formValues = this.productAddForm.getRawValue();

        const request = {
            id: this.curProduct ? this.curProduct.id : null,
            name: formValues.name,
            quantity: formValues.quantity,
            price: formValues.price,
            fileId: this.uploadedFiles.length > 0 ? this.uploadedFiles[0].id : null,
        };

        this.apiService.saveProduct(request).subscribe(response => {
            if (response.valid) {
                this.blockedPanel = false;
                this.displayProductModal = false;
                this.search(null, null);
            } else {
                this.globalService.showError(response.description);
            }
        }, error => {
            this.blockedPanel = false;
            this.globalService.showError(error.error.message);
        });
    }

    getFile(fileId): SafeUrl {
        return this.apiService.getFile(fileId);
    }

    openProductPayMoodal(product: any) {
        this.curProduct = product;
        this.displayProductPayModal = true;
    }

    buyProduct() {

    }
}
