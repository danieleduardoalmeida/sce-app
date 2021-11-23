import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { RelatorioModel } from 'src/app/model/relatorio.model'
import {ExemplarEspecieRelatorio} from 'src/app/model/exemplar.especie.relatorio'
import { RelatorioService } from 'src/app/service/relatorio.service';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})

export class RelatorioPage implements OnInit {
  dataVistoria: string;
  content: string;
  mostrarExemplares: boolean;
  relatorio: RelatorioModel[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private pdfGenerator: PDFGenerator,
    private relatorioService: RelatorioService) {
    this.mostrarExemplares = true;
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.visualizarRelatorio();
  }

  cancelar() {
    this.voltarLista();
  }

  gerarPdf() {
    this.content = document.getElementById('print-wrapper').innerHTML;
    let options = {
      documentSize: 'A4',
      type: 'share',
      fileName: `Visita_${this.dataVistoria}.pdf`
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });
  }

  private visualizarRelatorio() {
    let idParam = Number(this.route.snapshot.paramMap.get('id'));
    let dataVistoriaParam = this.route.snapshot.paramMap.get('dataVistoria');
    this.relatorioService.gerarRelatorio(idParam, dataVistoriaParam)
      .subscribe(
        el => {
          this.relatorio = el;
          this.mostrarExemplares = this.verificarExemplarEspecieVazio(this.relatorio)
        },
        err => {
          this.mostrarToast("Não foi possível gerar o relatorio");
        },
      );
  }

  private async mostrarToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  private verificarExemplarEspecieVazio(relatorio: RelatorioModel[]) {
    for (let celula of relatorio) {
      if (celula.exemplarEspecie) {
        for (var i = 0; i < celula.exemplarEspecie.length; i++) {
          if (celula.exemplarEspecie[i].exemplar === "" && celula.exemplarEspecie[i].especie === "")
            return true;
        }
        return false;
      } else {
        return true;
      }
    }
  }

  private voltarLista() {
    this.router.navigateByUrl('relatorios', { skipLocationChange: true }).then(() => {
      this.router.navigate(['relatorios'])
    });
  }

}