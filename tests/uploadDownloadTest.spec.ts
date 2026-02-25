import {test,expect} from '../tests/Fixtures/testData.ts';
import {uploadDownload} from '../src/pages/UploadDownloadPage';
import path from 'path';
import fs from'fs';
import { start } from 'repl';


test.describe('Validate Upload and download E2E', ()=>{
    let uploadDownloadObj: uploadDownload;
    test.beforeEach(async({page})=>{
        uploadDownloadObj= new uploadDownload(page);
        await uploadDownloadObj.navigate();
    });

    test('Validate succesfull upload',async({page,uploadFileData})=>{
     await uploadDownloadObj.uploadFile(uploadFileData.filePath,uploadFileData.fileName);
    });


let downloadedFilePath: string;

test('validate successful download', async () => {
  const fileName = 'sampleFile.jpeg';

  const download = await uploadDownloadObj.downloadFile();
  expect(download.suggestedFilename()).toBe(fileName);

  const downloadDir = path.join(__dirname, '../downloads');
  downloadedFilePath = path.join(downloadDir, fileName);

  await download.saveAs(downloadedFilePath);
  expect(fs.existsSync(downloadedFilePath)).toBeTruthy();
});

test.afterEach(() => {
  if (downloadedFilePath && fs.existsSync(downloadedFilePath)) {
    fs.unlinkSync(downloadedFilePath);
  }
});


});
