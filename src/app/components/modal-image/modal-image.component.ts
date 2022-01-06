import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {
  imageToUpload: File;
  imageUrl: string | ArrayBuffer;

  constructor(
    public modalService: ModalImageService,
    private fileService: FileUploadService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modalService.closeModal();
  }

  changeImage(file: File) {
    this.imageToUpload = file;

    if (!file) return;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
      this.modalService.img = reader.result;
    };
    // console.log(file);
  }

  updateImage() {
    const id = this.modalService.id;
    const type = this.modalService.type;
    this.fileService
      .updateImage(this.imageToUpload, type, id)
      .then((img) => {
        Swal.fire('Guardado', 'Se cambió la imagen de perfíl', 'success');
        this.modalService.newImg.emit(img);
        this.closeModal();
      })
      .catch((err) => {
        Swal.fire('Error', 'No se pudo actulizar la imagen', 'error');
      });
  }
}
