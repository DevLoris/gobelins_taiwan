import css from "./VlogPage.module.less";
import React, { useRef } from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import Vlog from "../../components/vlog/Vlog";

interface IProps {
  className: string;
  id: string;
}

const componentName = "VlogPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name VlogPage
 */
const VlogPage = (props: IProps) => {
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

  // -------------------–-------------------–-------------------–--------------- RENDER

  return (
    <div className={css.root} ref={rootRef}>
      <Vlog videoId="opening"/>
    </div>
  );
};

export default VlogPage;






