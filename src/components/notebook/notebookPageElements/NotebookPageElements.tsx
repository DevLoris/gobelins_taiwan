import css from './NotebookPageElements.module.less';
import React, {useEffect, useRef, useState} from 'react';
import {merge} from "../../../lib/utils/arrayUtils";
import {useTranslation} from "react-i18next";
import {selectCollectiblesOfSceneWithPickup, selectScene, selectUserActiveScene} from "../../../store/store_selector";
import {getState} from 'store/store';
import {IStateDataCollectibleWithPickup} from "../../../store/state_interface_data";
import NotebookElement from "../notebookElement/NotebookElement";
import NotebookPageElementsDetails from "../notebookPageElementsDetails/NotebookPageElementsDetails";
import NotebookTitle from "../notebookTitle/NotebookTitle";
import {IStateDataSceneCollectibleType} from "../../../store/state_enums";
import NotebookSignal, {NOTEBOOK_SEND} from "../notebook-signal";
import {gsap, ScrollToPlugin} from "gsap/all";

gsap.registerPlugin(ScrollToPlugin);

interface IProps {
  className?: string
  parentInnerRef: any
}

const componentName = "NotebookPageElements";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageElements
 * @desc Page objets, listing des contenus de la scène
 */
function NotebookPageElements (props: IProps) {
  // translation mobule
  const { t } = useTranslation();

  // sub-page state
  const [page, setPage] : [IStateDataCollectibleWithPickup, (IStateDataCollectibleWithPickup) => void]= useState(null);

  const [showPage, toggleShowPage]: [boolean, (boolean) =>  void] = useState(false);
  const [pageInDom, setPageInDom] = useState(false);

  const pageElRef = useRef();
  const listElRef = useRef();

  // get collectibles of scene
  const active_scene  = selectUserActiveScene(getState());
  const scene  = selectScene(active_scene)(getState().data);
  const collectibles  = selectCollectiblesOfSceneWithPickup(active_scene)(getState().data, getState().user_data).filter(value => {
    return value.type == IStateDataSceneCollectibleType.HINT;
  });

  // signal for forcing page change
  useEffect(() =>  {
    // Hide page
    toggleShowPage(false);

    NotebookSignal.getInstance().notebookContent.add((type, data) => {
      if(type == NOTEBOOK_SEND.CONTENT)  {
        // Set page data
        setPage({...data, pickup: true});
        // Show page
        toggleShowPage(true);
      }
    })
  }, []);

  useEffect(() => {

    const animDuration = .7;

    // If page is opening, add it to dom
    showPage && setPageInDom(true);

    gsap.to(listElRef.current, {scrollTo: 0, duration: animDuration * .5});

    pageElRef.current && gsap.fromTo(pageElRef.current, {
      xPercent: showPage ? 100 : 0,
    }, {
      xPercent: showPage ? 0 : 100,
      duration: animDuration,
      onComplete: () => {
        // If page has closed, remove it from dom
        !showPage && setPageInDom(false);
      }
    });

  }, [showPage]);

  return <>
    <div ref={listElRef} className={merge([css.root, props.className])}>
        <NotebookTitle
            title={scene.name}
            phonetic={scene.phonetic}
            chinese_title={scene.chinese_name}
            total={collectibles.length}
            picked={collectibles.filter(value => value.pickup).length}
        />

        <div className={css.notebookList}>
          {collectibles.map((data, i) => {
            return (<NotebookElement callback={() => {
              if(data.pickup) {
                setPage(data);
                toggleShowPage(true)
              }
            }}  data={data} key={i}/>)
          })}
        </div>
      </div>
    { pageInDom && <NotebookPageElementsDetails elRef={pageElRef} className={"light"} leaveButton={true} data={page} onExit={() => { toggleShowPage(false); }} /> }
    </>
}

export default NotebookPageElements
