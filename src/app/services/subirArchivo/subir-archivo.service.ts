import { URL_SERVICIOS } from '../../config/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArhivo(archivo: File, tipo: string, id: string) {
    
    return new Promise( (resolve, reject) => {
      
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
  
      formData.append('archivo', archivo, archivo.name);
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            resolve(JSON.parse(xhr.response));
          } else {

            reject(xhr.response);
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
    
  }


}
