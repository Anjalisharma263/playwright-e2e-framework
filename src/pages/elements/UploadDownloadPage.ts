import { Download, expect, Locator, Page } from "@playwright/test";

export class uploadDownload{
    readonly uploadInput:Locator;
    readonly uploadedPathText:Locator;
    readonly downloadBtn:Locator;
   // readonly download:Locator;
    constructor(private page:Page){
         this.uploadInput= page.locator('#uploadFile');
         this.uploadedPathText = page.locator('#uploadedFilePath');
         this.downloadBtn = page.locator('#downloadButton');
    }

    async navigate(){
     await this.page.goto('https://demoqa.com/upload-download');
    }

    async uploadFile(filePath:string,fileName:string){
        await this.uploadInput.setInputFiles(filePath);
        await expect(this.uploadedPathText).toContainText(fileName);
    }

    async downloadFile():Promise<Download>{
        const [downloadResponse] = await Promise.all([
             this.page.waitForEvent('download'),
                 this.downloadBtn.click()
        ])
        return downloadResponse;
    }
}