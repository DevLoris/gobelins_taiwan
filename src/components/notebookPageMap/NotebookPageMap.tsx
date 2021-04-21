import css from './NotebookPageMap.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import NotebookTitle from "../notebookTitle/NotebookTitle";

interface IProps {
  className?: string
}

const componentName = "NotebookPageMap";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageMap
 */
function NotebookPageMap (props: IProps) {
  return <div className={merge([css.root, props.className])}>
      <NotebookTitle title={"Carte de Taïwan"}/>
      <div>
          <img src={"/public/images/taiwan.jpeg"} />
      </div>
  </div>
}

export default NotebookPageMap
