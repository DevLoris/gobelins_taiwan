import css from "./CreditPage.module.less";
import React, { useRef } from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";

interface IProps {
  className: string;
}

const componentName = "CreditPage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name CreditPage
 */
const CreditPage = (props: IProps) => {
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
      <h3>Vlogueurs</h3>
      <ul>
        <li><a>Jimmy Beunardeau</a></li>
        <li><a>Rodolphe Miez</a></li>
      </ul>
      <h3>Sound designers</h3>
      <ul>
        <li><a>???</a></li>
      </ul>
      <h3>Voix</h3>
      <ul>
        <li><a>???</a></li>
      </ul>
      <h3>Développeurs</h3>
      <ul>
        <li><a>Loris Pinna</a></li>
        <li><a>Mickaël Debalme</a></li>
        <li><a>Sonia Rouabhi</a></li>
      </ul>
      <h3>Designers</h3>
      <ul>
        <li><a>Antoine Rault</a></li>
        <li><a>Sulyvan Batt</a></li>
        <li><a>Sandra Pereira da Costa</a></li>
      </ul>
        <h3>Remerciements</h3>
        <p>mettre logos</p>
    </div>
  );
};

export default CreditPage;






