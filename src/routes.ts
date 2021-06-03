import { IRoute } from "./lib/router/Router";

export enum ERouterPage {
  WEBGL_PAGE = "HomePage",
  NOTEBOOK_PAGE = "NotebookPage",
  VLOG_PAGE = "VlogPage",
  ELIGIBILITY_PAGE = "EligibilityPage",
  TRANSITION_PAGE = "TransitionPage"
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
    url: "/vlog",
    page: ERouterPage.VLOG_PAGE,
    importer: () => require("./pages/vlogPage/VlogPage"),
  },
  {
    url: "/eligibility",
    page: ERouterPage.ELIGIBILITY_PAGE,
    importer: () => require("./pages/eligibilityPage/EligibilityPage"),
  },
  {
    url: "/transition",
    page: ERouterPage.TRANSITION_PAGE,
    importer: () => require("./pages/transitionPage/TransitionPage"),
  },
];
