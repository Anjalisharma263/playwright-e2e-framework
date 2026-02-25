import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";
import { Response } from "@playwright/test";
import { BasePage } from "./basePage";
export class apiLinksPage extends BasePage{
        readonly homeLink:Locator;
        readonly HomeDFD5f:Locator;
        readonly apilinks: Record<string,Locator>;
        readonly responseText:Locator;
        readonly newPageExpectedURL:string
        readonly newPageExpectedImage:Locator;
   
        constructor(page: Page){
        super(page);
        this.homeLink = this.page.locator('#simpleLink');
        this.HomeDFD5f = page.locator('#dynamicLink');
        this.responseText= page.locator('#linkResponse');
        this.newPageExpectedURL = "https://demoqa.com/"
        this.newPageExpectedImage = page.locator('img[src="/images/Toolsqa.jpg"]');

        //API links
        this.apilinks={
        created : page.locator('#created'),
        noContent: page.locator('#no-content'),
        moved: page.locator('#moved'),
        badRequest: page.locator('#bad-request'),
        unauthorized:page.locator('#unauthorized'),
        forbidden: page.locator('#forbidden'),
        notFound: page.locator('#invalid-url')
        };
    }
    async navigate(){
        await this.page.goto('https://demoqa.com/links');
    }

    async openNewTab(locator:Locator):Promise<Page>{
    const [newTab] = await Promise.all([
        this.page.context().waitForEvent('page'),
        locator.click()
    ])
    return newTab;
    }
    async clickOnAPILinks(link:Locator,expectedStatus:number):Promise<Response>{
        const [response] = await Promise.all([
            this.page.waitForResponse(r=>r.status() === expectedStatus),
            link.click()
         ])
         return response;
    }
}