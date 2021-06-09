import css from './Notebook.module.less';
import React, {useEffect, useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import NotebookPageHint from "./notebookPageHint/NotebookPageHint";
import NotebookPageMap from "./notebookPageMap/NotebookPageMap";
import NotebookPageElements from "./notebookPageElements/NotebookPageElements";
import NotebookLabelToggler from "./notebookLabelToggler/NotebookLabelToggler";
import {useTranslation} from "react-i18next";
import NotebookSignal, {NOTEBOOK_SEND} from "./notebook-signal";
import {selectUserScenes} from "../../store/store_selector";
import {getState} from "../../store/store";
import {AudioHandler} from "../../lib/audio/AudioHandler";
import NotebookClose from "./notebookClose/NotebookClose";

interface IProps {
    className?: string,
    show?: boolean,
    onClose: () => void,
}

export enum NotebookPages {
    HINT,
    ELEMENTS,
    MAP
}

Notebook.defaultProps = {
    show: false,
    onClose: () => {}
};

/**
 * @name Notebook
 * @desc Carnet
 */
function Notebook (props: IProps) {
    const [page, setPage] : [NotebookPages, (NotebookPages) => void]= useState(NotebookPages.ELEMENTS);

    const { t } = useTranslation();

    // this effect reset book status to default one, for all page. a signal is send across all pages
    useEffect(() =>  {
        if(props.show) {
            AudioHandler.play("book");
        }
        NotebookSignal.getInstance().toggle(props.show);
    }, [props.show]);

    // signal for forcing page change
    useEffect(() =>  {
        NotebookSignal.getInstance().notebookContent.add((type, data) => {
            if(type == NOTEBOOK_SEND.PAGE)
                setPage(data);
        })
    }, []);

    const userScenes = selectUserScenes(getState());

    return <div className={merge([css.root, props.className,  props.show ? css.open: null])}>
        <div className={css.menu}>
            <NotebookLabelToggler active={NotebookPages.HINT == page} label={t('notebook__menu__hint')} onClick={() => {
                AudioHandler.play("page");
                setPage(NotebookPages.HINT);
            }}/>
            <NotebookLabelToggler active={NotebookPages.ELEMENTS == page} label={t('notebook__menu__elements')} onClick={() => {
                AudioHandler.play("page");
                setPage(NotebookPages.ELEMENTS);
            }}/>
            {userScenes.length > 0 && (
                <NotebookLabelToggler active={NotebookPages.MAP == page} label={t('notebook__menu__map')} onClick={() => {
                    AudioHandler.play("page");
                    setPage(NotebookPages.MAP);
                }}/>
            )}
            <NotebookClose onClick={props.onClose}/>
        </div>

        <div className={css.outer}>
            <div className={css.inner}>
                {(page == NotebookPages.HINT &&
                    <NotebookPageHint/>
                )}
                {(page == NotebookPages.ELEMENTS &&
                    <NotebookPageElements/>
                )}
                {(page == NotebookPages.MAP &&
                    <NotebookPageMap/>
                )}
            </div>
        </div>
    </div>
}

export default Notebook
