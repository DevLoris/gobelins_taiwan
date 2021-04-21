import css from './Notebook.module.less';
import React, {useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import NotebookPageHint from "../notebookPageHint/NotebookPageHint";
import NotebookPagePvt from "../notebookPagePvt/NotebookPagePvt";
import NotebookPageMap from "../notebookPageMap/NotebookPageMap";
import NotebookPageElements from "../notebookPageElements/NotebookPageElements";
import NotebookLabelToggler from "../notebookLabelToggler/NotebookLabelToggler";
import {useTranslation} from "react-i18next";

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

    const { t } = useTranslation();

    return <div className={merge([css.root, props.className])}>
        <div>
            <NotebookLabelToggler label={t('notebook__menu__hint')} onClick={() => { setPage(NotebookPages.HINT); }}/>
            <NotebookLabelToggler label={t('notebook__menu__elements')} onClick={() => { setPage(NotebookPages.ELEMENTS); }}/>
            <NotebookLabelToggler label={t('notebook__menu__map')} onClick={() => { setPage(NotebookPages.MAP); }}/>
            <NotebookLabelToggler label={t('notebook__menu__pvt')} onClick={() => { setPage(NotebookPages.PVT); }}/>
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
