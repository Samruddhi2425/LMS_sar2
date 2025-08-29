import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  private secretKey = 'SAR2@2025_Secure#Key_Lib!9xZt'; 

 encrypt(data: any): string {
  if (data === undefined || data === null) {
    throw new Error('EncryptService: Cannot encrypt undefined or null value');
  }
  return CryptoJS.AES.encrypt(String(data), this.secretKey).toString();
}
  decrypt(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
