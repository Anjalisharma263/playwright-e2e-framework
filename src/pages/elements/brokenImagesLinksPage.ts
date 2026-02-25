import { Locator, Page } from "@playwright/test";
import { Response } from "@playwright/test";
import { toBeLoadedImage } from "../../utils/customMatchers";
export class brokenImagesLinksPage{
    readonly validImage:Locator;
    readonly invalidImage:Locator;
    readonly validLink:Locator;
    readonly brokenLink:Locator;
    constructor(private page:Page){
        this.validImage = page.locator('img').nth(2);
        this.invalidImage = page.locator('img[src="/images/Toolsqa_1.jpg"]');
        this.validLink = page.getByRole('link', { name: 'Click Here for Valid Link' });
        this.brokenLink = page.getByRole('link',{name:'Click Here for Broken Link'});
    }
    async navigate(){
        await this.page.goto("/broken");
    }

    async validateImage(locator:Locator){
        const naturalWidthValue = await locator.evaluate((img:HTMLImageElement)=>img.naturalWidth)  
        return naturalWidthValue

    }

    async validatelinks(locator:Locator,expectedStatus:number):Promise<Response>{
        const [response] = await Promise.all([
            this.page.waitForResponse(r=>r.status()===expectedStatus),
            locator.click()

        ])
       return response;
     }


}