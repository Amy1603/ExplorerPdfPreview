import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { defaultOptions } from 'ngx-extended-pdf-viewer';
import { pdfBase64 } from './pdfBase64';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  public blob:any;
  constructor(){
    defaultOptions.workerSrc = './assets/pdf.worker-es5.js';
  
  }

  ngOnInit(){
    this.blob = this.b64toBlob(pdfBase64);
  }
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    return blob;

  }
}
