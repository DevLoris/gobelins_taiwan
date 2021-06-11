import css from './HomeSplash.module.less';
import React from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import Button, {ButtonStyle} from "../button/Button";

interface IProps {
  className?: string,
  startCallback: () =>  void
}

const componentName = "HomeSplash";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name HomeSplash
 */
function HomeSplash (props: IProps) {
  return <div className={merge([css.root, props.className])}>
    <img src={"/public/logo.png"} className={css.logo}/>
    <Button onClick={props.startCallback} label={"Commencer"} style={ButtonStyle.DEFAULT}/>
  </div>
}

export default HomeSplash
