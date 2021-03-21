import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-evaluation-dialog',
  templateUrl: './add-evaluation-dialog.component.html',
  styleUrls: ['./add-evaluation-dialog.component.scss'],
})
export class AddEvaluationDialogComponent implements OnInit {

  formGroup = this.formBuilder.group({
    nombreProyectoCtrl: ['', Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<AddEvaluationDialogComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void { }

  action(): void {
    const nombreProyecto = this.formGroup.value.nombreProyectoCtrl;
    this.dialogRef.close({ accept: true, nombreProyecto });
  }

  close(): void {
    this.dialogRef.close({ accept: false });
  }
}
