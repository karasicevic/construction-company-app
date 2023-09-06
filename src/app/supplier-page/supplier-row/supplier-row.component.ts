import { Component, Input } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';

@Component({
  selector: 'app-supplier-row',
  templateUrl: './supplier-row.component.html',
  styleUrls: ['./supplier-row.component.scss']
})
export class SupplierRowComponent {
  @Input() supplier!: Supplier;

}
