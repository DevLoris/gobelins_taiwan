import { IRoute } from "./lib/router/Router";

export enum ERouterPage {
  HOME_PAGE = "HomePage",
  NOTEBOOK_PAGE = "NotebookPage",
  WORK_PAGE = "WorkPage",
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
    url: "/work/{slug}",
    page: ERouterPage.WORK_PAGE,
    importer: () => require("./pages/workPage/WorkPage"),
  },
];
