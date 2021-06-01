import css from "./HomePage.module.less";
import React, {useRef, useState} from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import WebGlCanvas from "../../components/webGlCanvas/WebGlCanvas";
import Loader from "../../components/loader/Loader";
import InteractedElement from "../../components/interactedElement/InteractedElement";
import GameContainer from "../../components/gameContainer/GameContainer";
import ProtoFold from "../../components/protoFold/ProtoFold";

interface IProps {}

const componentName = "HomePage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name HomePage
 */
const HomePage = (props: IProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const [loadingDone, setLoadingDone] = useState<boolean>(false);

  // -------------------–-------------------–-------------------–--------------- REGISTER PAGE

  /**
   * playIn page transition
   * (remove this example if not use)
   */
  const playIn = (): Promise<void> => {
    return Promise.resolve();
  };

  /**
   * playOut page transition
   * (remove this example if not use)
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

  function onModelsLoaded() {
    setLoadingDone(true);
  }

  // -------------------–-------------------–-------------------–--------------- RENDER

  return (
    <div className={css.root} ref={rootRef}>
      <ProtoFold />
    </div>
  );
}

export default HomePage;
