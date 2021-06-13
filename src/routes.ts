import { IRoute } from "./lib/router/Router";

export enum ERouterPage {
  WEBGL_PAGE = "HomePage",
  NOTEBOOK_PAGE = "NotebookPage",
  ELIGIBILITY_PAGE = "EligibilityPage",
  CREDIT_PAGE = "CreditPage",
}

export const routes: IRoute[] = [
  {
    url: "/",
    page: ERouterPage.WEBGL_PAGE,
    importer: () => require("./pages/homePage/HomePage"),
  },
  {
    url: "/note/",
    page: ERouterPage.NOTEBOOK_PAGE,
    importer: () => require("./pages/notebookPage/NotebookPage"),
  },
  {
    url: "/eligibility",
    page: ERouterPage.ELIGIBILITY_PAGE,
    importer: () => require("./pages/eligibilityPage/EligibilityPage"),
  },
  {
    url: "/credit",
    page: ERouterPage.CREDIT_PAGE,
    importer: () => require("./pages/creditPage/CreditPage"),
  },
];
