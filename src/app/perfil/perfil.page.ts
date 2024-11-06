import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  profilePicture: string = '/assets/foto.png';

  constructor() { }

  ngOnInit() {
    const savedImage = localStorage.getItem('profilePicture');
    if (savedImage) {
      this.profilePicture = savedImage;
    }
  }

  async changeAvatar(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: source
    });

    this.profilePicture = image.dataUrl ?? '/assets/foto.png'; // Proporciona un valor predeterminado
    localStorage.setItem('profilePicture', this.profilePicture);
  }

  async showPhotoOptions() {
    const actionSheet = document.createElement('ion-action-sheet');
    actionSheet.header = 'Seleccionar fuente de la foto';
    actionSheet.buttons = [
      {
        text: 'Galería',
        icon: 'image',
        handler: () => {
          this.changeAvatar(CameraSource.Photos);
        }
      },
      {
        text: 'Cámara',
        icon: 'camera',
        handler: () => {
          this.changeAvatar(CameraSource.Camera);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
    ];
    document.body.appendChild(actionSheet);
    await actionSheet.present();
  }
}