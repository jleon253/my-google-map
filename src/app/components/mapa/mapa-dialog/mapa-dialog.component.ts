import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-mapa-dialog',
  templateUrl: './mapa-dialog.component.html',
  styleUrls: ['./mapa-dialog.component.css'],
})
export class MapaDialogComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MapaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) {
    this.myForm = this._fb.group({
      titulo: [data.titulo, [Validators.required, Validators.minLength(4)]],
      descripcion: [data.descripcion, [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {}

  saveDialog() {
    if (this.myForm.valid) {
      this.dialogRef.close(this.myForm.value);
    } else {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
  }

  get tituloNoValido() {
    return this.myForm.get('titulo').invalid && this.myForm.get('titulo').touched;
  }
  
  get descripcionNoValido() {
    return this.myForm.get('descripcion').invalid && this.myForm.get('descripcion').touched;
  }
}
