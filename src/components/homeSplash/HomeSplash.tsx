import css from './HomeSplash.module.less';
import React, {useEffect, useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import Button, {ButtonStyle} from "../button/Button";
import Settings from "../settings/Settings";
import SettingsToggler from "../settings/settingsToggler/SettingsToggler";

import {useTranslation} from "react-i18next";

interface IProps {
  className?: string,
  startCallback: () => void,
}

const componentName = "HomeSplash";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name HomeSplash
 */
function HomeSplash(props: IProps) {
  const {t} = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);


  return <div className={merge([css.root, props.className])}>
    <img src={"/public/logo.png"} className={css.logo}/>
    <Button onClick={props.startCallback} label={t("homesplash__button__start")} style={ButtonStyle.DEFAULT}/>
      <Settings show={settingsOpen}
                onClose={() => setSettingsOpen(false)}/>
      <SettingsToggler onClick={() => setSettingsOpen(!settingsOpen)}/>
  </div>
}

export default HomeSplash
