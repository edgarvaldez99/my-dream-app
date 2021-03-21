import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SegmentoEnum } from 'src/app/enums/segmento.enum';
import { TipoContratoEnum } from 'src/app/enums/tipo-contrato.enum';
import { TipoNegocioEnum } from 'src/app/enums/tipo-negocio.enum';
import { TipoPuestoEnum } from 'src/app/enums/tipo-puesto.enum';
import { ZonaNegocioEnum } from 'src/app/enums/zona-negocio.enum';
import { ProyectoInversion } from 'src/app/interfaces/proyecto-inversion';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent implements OnInit {

  isLoading = false;
  isLoadingConf = false;
  isLoadingConfId = -1;
  isMobile = false;
  filterValue = '';
  messageList = '¡Aguarde un momento!';
  isAdminAdmin = false;

  // Enums
  zonas = [
    { zona: ZonaNegocioEnum.URBANA },
    { zona: ZonaNegocioEnum.RURAL },
  ];
  tipos = [
    { tipo: TipoNegocioEnum.ESTACION_SERVICIOS },
    { tipo: TipoNegocioEnum.PCP },
    { tipo: TipoNegocioEnum.DISTRIBUIDOR },
    { tipo: TipoNegocioEnum.GAS },
    { tipo: TipoNegocioEnum.OTRO },
  ];
  departamentos = [
    { departamento: 'Alto Paraguay' },
    { departamento: 'Alto Parana' },
    { departamento: 'Amambay' },
    { departamento: 'Alto Paraguay' },
    { departamento: 'Boqueron' },
  ];
  segmentos = [
    { segmento: SegmentoEnum.ESTACION_SERVICIOS },
    { segmento: SegmentoEnum.GC },
    { segmento: SegmentoEnum.LUBRICANTES },
    { segmento: SegmentoEnum.GAS },
    { segmento: SegmentoEnum.AVIACION },
  ];
  puestos =  [
    { puesto: TipoPuestoEnum.PT },
    { puesto: TipoPuestoEnum.PP },
  ];
  contratos = [
    { contrato: TipoContratoEnum.NUEVO },
    { contrato: TipoContratoEnum.RENOVACION },
  ];

  // listado
  listProjects: ProyectoInversion[] = [];

  formGroup = this.formBuilder.group({
    nombreDelProyectoCtrl: ['', Validators.required],
    razonSocialCtrl: ['', Validators.required],
    zonaNegocioCtrl: ['', Validators.required],
    domicilioCtrl: ['', Validators.required],
    tipoNegocioCtrl: ['', Validators.required],
    localidadCtrl: ['', Validators.required],
    departamentoCtrl: ['', Validators.required],
    segmentoCtrl: ['', Validators.required],
    asesorComercialCtrl: ['', Validators.required],
    tipoPuestoCtrl: ['', Validators.required],
    indicarContratoCtrl: ['', Validators.required],
    valorTerrenoCtrl: ['', Validators.required],
    fechaCompraTerrenoCtrl: ['', Validators.required],
    totalAreaCtrl: ['', Validators.required],
    totalAreaDosCtrl: ['', Validators.required],
  });

  constructor(
    public dialog: MatDialog,
    private filterService: FilterService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.filterService.observable().subscribe(filter => {
      this.filterValue = filter;
    });
  }

  backToProject(): void {
    this.router.navigate(['/admin/proyectos']);
  }
}
