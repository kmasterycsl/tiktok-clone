import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(
    private toastController: ToastController,
  ) { }

  showToast(opts: ToastOptions) {
      return this.toastController.create({
          ...{
              duration: 2000,
          },
          ...opts
      }).then(t => t.present())
  }
}
