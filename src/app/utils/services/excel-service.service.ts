/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx-js-style';
@Injectable({
    providedIn: 'root',
})
export class ExcelServiceService {
    constructor() {}

    exportDataToExcelJson(
        data: any[],
        name: string,
        hideHeaders: boolean
    ): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, {
            skipHeader: hideHeaders,
        });

        const workbook: XLSX.WorkBook = {
            Sheets: { Hoja1: worksheet },
            SheetNames: ['Hoja1'],
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        this.saveExcelAsFile(excelBuffer, name);
    }

    exportDataToExcelArray(
        data: any[],
        name: string,
        colProps: any[],
        merges: any[]
    ): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
        worksheet['!cols'] = colProps;
        worksheet['!merges'] = merges;
        const range = { s: { r: 1, c: 4 }, e: { r: 23, c: 5 } };
        const fmt = '0.000';
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
                // eslint-disable-next-line curly
                if (!cell || cell.t !== 'n') continue; // only format numeric cells
                cell.z = fmt;
            }
        }
        const workbook: XLSX.WorkBook = {
            Sheets: { Hoja1: worksheet },
            SheetNames: ['Hoja1'],
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        this.saveExcelAsFile(excelBuffer, name);
    }

    saveExcelAsFile(excelBuffer: any, fileName: string): void {
        const data: Blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });
        const today = new Date();
        const date =
            today.getFullYear() +
            '' +
            (today.getMonth() + 1) +
            '' +
            today.getDate();
        const time = '_' + today.getHours() + '-' + today.getMinutes();
        const name = `${fileName}_${date}${time}_.xlsx`;
        saveAs(data, name);
    }
}
