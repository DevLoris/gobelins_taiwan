import css from './NotebookPageElements.module.less';
import React, {useState} from 'react';
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

interface IProps {
  className?: string
}

const componentName = "NotebookPageElements";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageElements
 */
function NotebookPageElements (props: IProps) {
  // translation mobule
  const { t } = useTranslation();

  // sub-page state
  const [page, setPage] : [IStateDataCollectibleWithPickup, (IStateDataCollectibleWithPickup) => void]= useState(null);
  const [showPage, toggleShowPage]: [boolean, (boolean) =>  void] = useState(false);

  // get collectibles of scene
  const active_scene  = selectUserActiveScene(getState());
  const scene  = selectScene(active_scene)(getState().data);
  const collectibles  = selectCollectiblesOfSceneWithPickup(active_scene)(getState().data, getState().user_data).filter(value => {
    return value.type == IStateDataSceneCollectibleType.HINT;
  });

  // reset to close details page
  NotebookSignal.getInstance().onToggle.add((value) =>  {
    if(value)
      toggleShowPage(false);
  })

  if(showPage) {
    return <NotebookPageElementsDetails className={"light"} leaveButton={true} data={page} onExit={() => { toggleShowPage(false); }} />
  }
  else {
    return <div className={merge([css.root, props.className])}>
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
  }
}

export default NotebookPageElements
