import {test,expect} from '../src/fixtures/baseTest';
import { logger } from '../src/utils/logger.ts';

 const invalidFormData={
  personal:{
  fName: "anjali",
  lastName: "sharma",
  email: "sanjali263sharma@gmail.com",
  mobile: '7036',
  dob: '26/03/1994',
    },
 address:{
    city: "Delhi",
    state:"NCR",
    currentAddress: "lajpat Nagar"
},
 hobbies:['Sports'],
 subjects:['English','Chemistry']
};

test('@smoke Validate form submission with invalid mobile', async ({ practiseForm, uploadFile }) => {
   logger.info('Starting filling form test with invalid values');
  await test.step('Fill form data', async () => {
    await practiseForm.fillPersonalInfo(invalidFormData.personal);
    await practiseForm.fillAddress(invalidFormData.address);
    await practiseForm.selectHobbies(invalidFormData.hobbies);
    await practiseForm.selectMultiSubjects(invalidFormData.subjects);
  });

  await test.step('Upload file', async () => {
    await practiseForm.uploadFile(uploadFile.filePath);
  });

  await test.step('Submit form', async () => {
    await practiseForm.submitDetails();
  });

  await test.step('Validate mobile error', async () => {
    await expect(practiseForm.mobileNum)
      .toHaveCSS('border-color', 'rgb(250,64,93)');
  });

});
