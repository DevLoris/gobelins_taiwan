import css from './HomeSplash.module.less';
import React, {useEffect, useRef, useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import Settings from "../settings/Settings";
import SettingsToggler from "../settings/settingsToggler/SettingsToggler";

import {useTranslation} from "react-i18next";
import * as gsap from "gsap";

interface IProps {
  className?: string,
  startCallback: () => void,
  mode: EHomeSplashMode
}

export enum EHomeSplashMode {
  DESKTOP,
  MOBILE
}

const componentName = "HomeSplash";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name HomeSplash
 */
function HomeSplash(props: IProps) {
  const {t} = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const ticketButton = useRef();

  function animationButton() {
    gsap.gsap.fromTo(ticketButton.current, {
      rotate: 0
    }, {
      rotate: 20,
      y: 10,
      onComplete:  ()  => {
        props.startCallback();
      }
    });
  }

  return <div className={merge([css.root, props.className])}>

    <div className={props.mode === EHomeSplashMode.MOBILE  ? css.homepageContent : css.homepageContent_desktop}>
      <div>
        <img src={"/public/da/logo_beige.svg"} className={css.logo} alt={"logo"}/>
        <p className={css.baseline}>Taiwan n'attend que toi</p>
      </div>

      {
        props.mode === EHomeSplashMode.MOBILE &&
          <div className={css.startButton}  onClick={animationButton}>
            <img src={"public/da/button_start_text.svg"} alt={"Start Experience"}/>
            <img ref={ticketButton} src={"public/da/button_start_arrow.svg"} alt={"Start Experience"}/>
          </div>
      }

      {
        props.mode === EHomeSplashMode.DESKTOP &&
          <div className={css.desktopInner}>
            <img src={"/public/images/qrcode.png"} />
            <p className={css.desktopMessage} dangerouslySetInnerHTML={{ __html: "Patience, la version ordinateur arrive bientôt.<br>En attendant, l'aventure t'attend déjà sur mobile !" }} />
          </div>
      }
    </div>

    {
      props.mode === EHomeSplashMode.MOBILE &&
          <>
            <Settings show={settingsOpen}
                      onClose={() => setSettingsOpen(false)}/>
            <SettingsToggler onClick={() => setSettingsOpen(!settingsOpen)}/>
          </>
    }
  </div>
}

export default HomeSplash
