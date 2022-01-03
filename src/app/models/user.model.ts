import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img: string = '',
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {}

  printInfo() {
    console.log(`name: ${this.name}, email: ${this.email}`);
  }

  get imageUrl() {
    if (this.img.includes('https')) {
      // console.log('url img:', this.img);
      return this.img;
    }
    if (this.img) {
      // console.log('url img:', this.img);
      return `${base_url}/upload/users/${this.img}`;
    }
    // console.log('url img:', this.img);
    return `${base_url}/upload/users/no-image`;
  }
}
