

import { Injectable } from '@angular/core';
import { environment } from 'environments/ums/environment.local';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})

export class EncryptionService {
  private key = CryptoJS.enc.Utf8.parse(environment.key_encryption);

  encryptPassword(inputVal) {
    const utf8Password = CryptoJS.enc.Utf8.parse(inputVal.password);
    const encrypted = CryptoJS.AES.encrypt(utf8Password, this.key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    return {

       encrypted
    }
  }
}
