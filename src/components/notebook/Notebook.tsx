import css from './Notebook.module.less';
import React, {useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import NotebookPageHint from "../notebookPageHint/NotebookPageHint";
import NotebookPagePvt from "../notebookPagePvt/NotebookPagePvt";
import NotebookPageMap from "../notebookPageMap/NotebookPageMap";
import NotebookPageElements from "../notebookPageElements/NotebookPageElements";
import NotebookLabelToggler from "../notebookLabelToggler/NotebookLabelToggler";

interface IProps {
  className?: string
}

enum NotebookPages {
    HINT,
    ELEMENTS,
    PVT,
    MAP
}

const componentName = "Notebook";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name Notebook
 */
function Notebook (props: IProps) {
    const [page, setPage] : [NotebookPages, (NotebookPages) => void]= useState(NotebookPages.ELEMENTS);

  return <div className={merge([css.root, props.className])}>
      <div>
          <NotebookLabelToggler label={"Enigmes"} onClick={() => { setPage(NotebookPages.HINT); }}/>
          <NotebookLabelToggler label={"Elements"} onClick={() => { setPage(NotebookPages.ELEMENTS); }}/>
          <NotebookLabelToggler label={"Map"} onClick={() => { setPage(NotebookPages.MAP); }}/>
          <NotebookLabelToggler label={"PVT"} onClick={() => { setPage(NotebookPages.PVT); }}/>
      </div>

      {(page == NotebookPages.HINT &&
          <NotebookPageHint/>
      )}
      {(page == NotebookPages.ELEMENTS &&
          <NotebookPageElements/>
      )}
      {(page == NotebookPages.MAP &&
          <NotebookPageMap/>
      )}
      {(page == NotebookPages.PVT &&
          <NotebookPagePvt/>
      )}
  </div>
}

export default Notebook
