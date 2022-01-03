import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User;
  imageToUpload: File;
  imageUrl: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileService: FileUploadService
  ) {
    this.user = this.userService.user;
    this.imageUrl = this.user.imageUrl;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    // console.log(this.profileForm.value);
    this.userService.updateUser(this.profileForm.value).subscribe(
      (resp: any) => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        console.log(resp);

        Swal.fire('Guardado', 'Se guardaron los cambios', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  changeImage(file: File) {
    this.imageToUpload = file;

    if (!file) return;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };

    // console.log(file);
  }

  updateImage() {
    this.fileService
      .updateImage(this.imageToUpload, 'users', this.user.uid)
      .then((img) => {
        this.user.img = img;

        Swal.fire('Guardado', 'Se cambió la imagen de perfíl', 'success');
      })
      .catch((err) => {
        Swal.fire('Error', 'No se pudo actulizar la imagen', 'error');
      });
  }

  hasImage() {
    if (!this.imageToUpload) return false;
    return this.imageToUpload.type.includes('image');
  }
}
