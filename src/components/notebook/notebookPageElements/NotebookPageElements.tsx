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
  // translation module
  const { t } = useTranslation();

  // sub-page state
  const [page, setPage] : [IStateDataCollectibleWithPickup, (IStateDataCollectibleWithPickup) => void]= useState(null);

  const [showPage, toggleShowPage]: [boolean, (boolean) =>  void] = useState(false);
  const [pageInDom, setPageInDom] = useState(false);
  const [listInDom, setListInDom] = useState(false);

  const pageElRef = useRef();

  // get collectibles of scene
  const active_scene  = selectUserActiveScene(getState());
  const scene  = selectScene(active_scene)(getState().data);
  const collectibles  = selectCollectiblesOfSceneWithPickup(active_scene)(getState().data, getState().user_data).filter(value => {
    return value.type == IStateDataSceneCollectibleType.HINT;
  });

  /**
   * Page animation process:
   *
   *  On open, add page element to DOM
   *  On page added to dom, play in.
   *
   *  On close, play out.
   *  When played out, remove from dom.
   */

  // signal for forcing page change
  useEffect(() =>  {
    // Hide page
    toggleShowPage(false);
    // Show list
    setListInDom(true);

    NotebookSignal.getInstance().notebookContent.add((type, data) => {
      if(type == NOTEBOOK_SEND.CONTENT)  {
        // Set page data
        setPage({...data, pickup: true});
        // Show page
        toggleShowPage(true);
      }
    })
  }, []);

  // Page open status
  useEffect(() => {
    // If page is opening, add it to dom (play in handled in next useEffect)
    // else, add list to dom and play out page
    if(showPage) {
      setPageInDom(true)
    }
    else {
      setListInDom(true);
      pageAnimation(false);
    }
  }, [showPage]);

  // Page in dom status
  useEffect(() => {
    if(!pageInDom) return;

    // If page is in dom, play in
    pageAnimation();
    // Play out is handled in previous useEffect

  }, [pageInDom]);

  /**
   * Page play in / out animation
   * @param pShow
   * @param pDuration
   */
  function pageAnimation(pShow:boolean = true, pDuration:number = .7) {
    // Scroll top in list
    if(props.parentInnerRef.current.scrollTop > 0) {
      gsap.to(props.parentInnerRef.current, {scrollTo: {x: 0, y: 0}, duration: pDuration * .5, ease: "power2.easeInOut"});
    }
    // Scroll top in page
    pShow && props.parentInnerRef.current.scrollTo(0,0);

    pageElRef.current && gsap.fromTo(pageElRef.current, {
      xPercent: pShow ? 100 : 0,
    }, {
      xPercent: pShow ? 0 : 100,
      duration: pDuration,
      ease: "power2.easeOut",
      onComplete: () => {
        // If page has closed, remove it from dom
        !pShow && setPageInDom(false);
        // If page has opened, remove list from dom
        pShow && setListInDom(false);
      }
    });
  }

  return <>
    {
      listInDom &&
      <div className={merge([css.root, props.className])}>
        <div className={css.notebookHeader}>
          <NotebookTitle
              title={scene.name}
              phonetic={scene.phonetic}
              chinese_title={scene.chinese_name}
              total={collectibles.length}
              picked={collectibles.filter(value => value.pickup).length}
          />
        </div>

        <div className={css.notebookList}>
          {collectibles.map((data, i) => {
            return (<NotebookElement callback={() => {
              if(data.pickup && !pageInDom) {
                setPage(data);
                toggleShowPage(true)
              }
            }}  data={data} key={i}/>)
          })}
        </div>
      </div>
    }
    { pageInDom && <NotebookPageElementsDetails elRef={pageElRef} className={"light"} leaveButton={true} data={page} onExit={() => { toggleShowPage(false); }} /> }
    </>
}

export default NotebookPageElements
