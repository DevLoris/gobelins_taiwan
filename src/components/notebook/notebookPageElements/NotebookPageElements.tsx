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
import NotebookSignal from "../notebook-signal";
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

  // get collectibles of scene
  const active_scene  = selectUserActiveScene(getState());
  const scene  = selectScene(active_scene)(getState().data);
  const collectibles  = selectCollectiblesOfSceneWithPickup(active_scene)(getState().data, getState().user_data).filter(value => {
    return value.type == IStateDataSceneCollectibleType.HINT;
  });

  const detailsPageRef = useRef(null);
  const listPageRef = useRef(null);

  // reset to close details page
  NotebookSignal.getInstance().onToggle.add((value) =>  {
    if(value)
      toggleShowPage(false);
  });

  useEffect(() => {
    showPage ? setPageInDom(true) : pageAnimation(false);
  }, [showPage]);

  useEffect(() => {
    pageAnimation(showPage);
  }, [pageInDom]);

  function pageAnimation(pVisible:boolean = false, pDuration: number = .7) {
    if(detailsPageRef.current) {
      gsap.set(detailsPageRef.current, {
        xPercent: pVisible ? 110 : 0,
        onStart: () => {
          if(pVisible) {
            gsap.to(props.parentInnerRef.current, {
              scrollTo: 0,
              duration: pDuration * .7,
            });
          }
          else {
            listPageRef.current.style.display = "block";
          }
        },
      });
      gsap.to(detailsPageRef.current, {
        xPercent: pVisible ? 0 : 110,
        duration: pDuration,
        onComplete: () => {
          pVisible ? listPageRef.current.style.display = "none" : setPageInDom(false);
        },
      });
    }
  }

  return (
      <>
        <div ref={listPageRef} className={merge([css.root, props.className])}>
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
        {
          pageInDom && <div ref={detailsPageRef} className={css.pageContainer}><NotebookPageElementsDetails className={"light"} leaveButton={true} data={page} onExit={() => { toggleShowPage(false); }} /></div>
        }
      </>
  );
}

export default NotebookPageElements
