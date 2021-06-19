import css from './Notebook.module.less';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import NotebookPageHint from "./notebookPageHint/NotebookPageHint";
import NotebookPageMap from "./notebookPageMap/NotebookPageMap";
import NotebookPageElements from "./notebookPageElements/NotebookPageElements";
import NotebookLabelToggler from "./notebookLabelToggler/NotebookLabelToggler";
import {useTranslation} from "react-i18next";
import NotebookSignal, {NOTEBOOK_SEND} from "./notebook-signal";
import {selectTutorial, selectUserScenes} from "../../store/store_selector";
import {getState, store, tutorial} from "../../store/store";
import {AudioHandler} from "../../lib/audio/AudioHandler";
import NotebookClose from "./notebookClose/NotebookClose";
import {WebGlManager} from "../webGlCanvas/WebGlManagerClasses/WebGlManager";
import gsap from "gsap";
import {TutorialState} from "../../store/state_interface_experience";

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

    const rootRef = useRef(null);
    const innerRef = useRef(null);
    const menuButtonsRefs = useRef([]);

    const { t } = useTranslation();

    // signal for forcing page change
    useEffect(() =>  {
        revealAnimation(false, 0);

        let handler = (type, data) => {
            if(type == NOTEBOOK_SEND.PAGE)
                setPage(data);
        }
        NotebookSignal.getInstance().notebookContent.add(handler)

        return () => {
            NotebookSignal.getInstance().notebookContent.remove(handler);
        }
    }, []);

    // this effect reset book status to default one, for all page. a signal is send across all pages
    useEffect(() =>  {
        if(props.show) {
            AudioHandler.play("book");

            if(selectTutorial(getState()) == TutorialState.INTRODUCTION)
                store.dispatch(tutorial(TutorialState.BEFORE_MAP));
        }

        NotebookSignal.getInstance().toggle(props.show);
        WebGlManager.getInstance().toggleRendering(!props.show);

        revealAnimation(props.show);

    }, [props.show]);

    function revealAnimation(pShow:boolean, pDuration:number = .7) {
        // remove default display none
        pShow && gsap.set(rootRef.current, {display: "block"})

        // Fix : menuButtonsRefs animation breaks css rotate.
        menuButtonsRefs.current.forEach((el, index) => {
            gsap.set(el, {rotateZ: index === 0 ? -1 : (index === 1) ? 1 : 0});
        })

        // Cancel current animation
        gsap.killTweensOf(rootRef.current);
        gsap.killTweensOf(menuButtonsRefs.current);

        // Start animation
        // Root
        gsap.to(rootRef.current, {
            xPercent: pShow ? 0 : 120,
            rotateZ: pShow ? 0 : -15,
            duration: pDuration,
            ease: "power2.easeOut",
        });
        // Menu buttons
        gsap.to(menuButtonsRefs.current, {
            yPercent: pShow ? 0 : 110,
            duration: pDuration * .8,
            delay: pDuration * .2,
            stagger: {
                each: pShow ? pDuration * .3 : 0,
            },
        });
    }

    const userScenes = selectUserScenes(getState());

    return <div ref={rootRef} className={merge([css.root, props.className])}>
        <div className={css.menu}>
            <NotebookLabelToggler elRef={(r) => (menuButtonsRefs.current[0] = r)} active={NotebookPages.HINT == page} label={t('notebook__menu__hint')} onClick={() => {
                AudioHandler.play("page");
                setPage(NotebookPages.HINT);
                NotebookSignal.getInstance().tabChange();
            }}/>
            <NotebookLabelToggler elRef={(el) => menuButtonsRefs.current[1] = el} active={NotebookPages.ELEMENTS == page} label={t('notebook__menu__elements')} onClick={() => {
                AudioHandler.play("page");
                setPage(NotebookPages.ELEMENTS);
                NotebookSignal.getInstance().tabChange();
            }}/>
            {userScenes.filter(value => value.visible_on_map).length > 1 && (
                <NotebookLabelToggler elRef={(el) => menuButtonsRefs.current[2] = el} active={NotebookPages.MAP == page} label={t('notebook__menu__map')} onClick={() => {
                    AudioHandler.play("page");
                    setPage(NotebookPages.MAP);
                    NotebookSignal.getInstance().tabChange();
                }}/>
            )}
            <NotebookClose onClick={props.onClose}/>
        </div>

        <div className={css.outer}>
            <div className={css.inner} ref={innerRef}>
                {(page == NotebookPages.HINT &&
                    <NotebookPageHint/>
                )}
                {(page == NotebookPages.ELEMENTS &&
                    <NotebookPageElements parentInnerRef={innerRef}/>
                )}
                {(page == NotebookPages.MAP &&
                    <NotebookPageMap/>
                )}
            </div>
        </div>
    </div>
}

export default Notebook
