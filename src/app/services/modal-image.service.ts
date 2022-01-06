import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private _hideModal = true;
  type: 'users' | 'hospitals' | 'doctors';
  id: string;
  img: string | ArrayBuffer;
  newImg = new EventEmitter<string>();

  constructor() {}

  get hideModal() {
    // console.log('hidemodal');
    return this._hideModal;
  }

  openModal(
    type: 'users' | 'hospitals' | 'doctors',
    id: string,
    img: string = 'no-img'
  ) {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    this.img = img;

    if (img.includes('https')) {
      // console.log('url img:', this.img);
      this.img = img;
    } else if (img) {
      // console.log('url img:', this.img);
      this.img = `${base_url}/upload/${type}/${img}`;
    }
    this.img = `${base_url}/upload/users/no-image`;
  }

  closeModal() {
    this._hideModal = true;
  }
}
