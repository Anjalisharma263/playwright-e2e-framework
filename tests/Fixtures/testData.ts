import {test as base} from '@playwright/test';//“Give me Playwright’s test so I can add my own stuff to it.”
import webTableData from '../data/webTableData.json'; 
import textBoxData from "../data/textBoxData.json";


type TestFixtures={ //My tests will receive an extra object called TestFixtures. 
// My fixtures will provide 3 datasets, and their shape must exactly match what’s in the JSON file
textBoxAddData:typeof textBoxData.fillDataInTextbox;
webTableAddData:typeof webTableData.addRecord;
webTableUpdateData:typeof webTableData.updateRecord;
uploadFileData: {
    filePath: string;
    fileName: string;
  };
downloadFileDetails:{
    filePathDownload:string;
    fileNameDownload:string;
};
};

//Create a new test that has extra fixtures defined in TestData.

export const test = base.extend<TestFixtures>({textBoxAddData:async({},use:any)=>{
    await use(textBoxData.fillDataInTextbox); //use()This is the value the test will receive
    },
webTableAddData:async({},use:any)=>{
    await use(webTableData.addRecord);
},
webTableUpdateData:async({},use:any)=>{
    await use(webTableData.updateRecord);
},
uploadFileData:async({},use:any)=>{
    await use({
    fileName: '20240330.jpg',
    filePath: 'C:/Users/anura.WIN-EIMV2SPMQI4/OneDrive/Pictures/20240330.jpg'
    })
},
downloadFileDetails: async({},use:any)=>{
    await use({
         fileName: 'sampleFile.jpeg',
    filePath: 'C:/Users/anura.WIN-EIMV2SPMQI4/Downloads/' 
    })
}
})
export {expect} from '@playwright/test'


