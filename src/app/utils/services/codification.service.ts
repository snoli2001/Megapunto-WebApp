import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { enc, SHA512, WordArray } from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class CodificationService {
    constructor() {}

    encrypt(plainText: string): string {
        const password = '!Y5LXp5vJy0&4TB6Dr5&Y@W7I*c11$';
        const bytesToBeEncrypted: number[] = this.encodeUtf8(plainText);
        let passwordBytes: number[] | WordArray = this.encodeUtf8(password);

        passwordBytes = SHA512(passwordBytes.toString());
        const bytesEncrypted: string = this.encodeBase64(
            this.encrypt(
                bytesToBeEncrypted.toString() + passwordBytes.toString()
            )
        );

        return bytesEncrypted;
    }

    encodeBase64(bytesEncrypted: string): string {
        return Buffer.from(bytesEncrypted, 'base64').toString('binary');
    }

    encodeUtf8(text: string): number[] {
        const code = encodeURIComponent(text);
        const bytes: Byte[] = [];
        for (let i = 0; i < code.length; i++) {
            const c = code.charAt(i);
            if (c === '%') {
                const hex = code.charAt(i + 1) + code.charAt(i + 2);
                const hexVal = parseInt(hex, 16);
                bytes.push(hexVal);
                i += 2;
            } else {
                bytes.push(c.charCodeAt(0));
            }
        }
        return bytes;
    }
}
