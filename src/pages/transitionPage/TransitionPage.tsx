import css from "./TransitionPage.module.less";
import React, {useEffect, useRef} from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import {Router} from "../../lib/router/Router";
import {ERouterPage} from "../../routes";

interface IProps {
  className: string;
}

const componentName = "TransitionPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name TransitionPage
 */
const TransitionPage = (props: IProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  // -------------------–-------------------–-------------------–--------------- REGISTER PAGE

  /**
   * playIn page transition
   * (remove if not use)
   */
  const playIn = (): Promise<void> => {
    return Promise.resolve();
  };

  /**
   * playOut page transition
   * (remove if not use)
   */
  const playOut = (): Promise<void> => {
    return Promise.resolve();
  };

  /**
   * Register page for ViewStack
   * NOTE: each page of ViewStack need to be register to work.
   * Minimal register should be: usePageRegister({ componentName, rootRef });
   * (remove playIn and playOut if not use)
   */
  usePageRegister({ componentName, rootRef, playIn, playOut });


  useEffect(() => {

    // Only used to redirect to vlog page for now
    Router.openPage({page: ERouterPage.VLOG_PAGE});

  }, []);

  // -------------------–-------------------–-------------------–--------------- RENDER

  return (
    <div className={css.root} ref={rootRef} />
  );
};

export default TransitionPage;
