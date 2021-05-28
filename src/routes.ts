import { IRoute } from "./lib/router/Router";

export enum ERouterPage {
  HOME_PAGE = "HomePage",
  NOTEBOOK_PAGE = "NotebookPage",
  VLOG_PAGE = "VlogPage",
  ELIGIBILITY_PAGE = "EligibilityPage",
}

export const routes: IRoute[] = [
  {
    url: "/",
    page: ERouterPage.HOME_PAGE,
    importer: () => require("./pages/homePage/HomePage"),
  },
  {
    url: "/note/",
    page: ERouterPage.NOTEBOOK_PAGE,
    importer: () => require("./pages/notebookPage/NotebookPage"),
  },
  {
    url: "/vlog",
    page: ERouterPage.VLOG_PAGE,
    importer: () => require("./pages/vlogPage/VlogPage"),
  },
  {
    url: "/eligibility",
    page: ERouterPage.ELIGIBILITY_PAGE,
    importer: () => require("./pages/eligibilityPage/EligibilityPage"),
  },
];
