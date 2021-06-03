import css from './NotebookPageMap.module.less';
import React, {useState} from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import NotebookTitle from "../notebookTitle/NotebookTitle";
import {useTranslation} from "react-i18next";
import {selectCollectiblesOfSceneWithPickup, selectScene, selectScenes} from "../../../store/store_selector";
import {getState} from "../../../store/store";
import {IStateDataScene} from "../../../store/state_interface_data";
import NotebookPageMapDetails from "../notebookPageMapDetails/NotebookPageMapDetails";
import NotebookSignal from "../notebook-signal";
import {IStateDataSceneCollectibleType} from "../../../store/state_enums";

interface IProps {
  className?: string
}

const componentName = "NotebookPageMap";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPageMap
 */
function NotebookPageMap (props: IProps) {
    // use translation
    const { t } = useTranslation();

    // get all scenes (for map pins)
    let scenes = selectScenes(getState());

    // toggle popup for details
    let [detailsScene, setDetailsScene] = useState<string>(null);

    // reset to close details page
    NotebookSignal.getInstance().onToggle.add((value) =>  {
        if(value)
            setDetailsScene(null);
    })

    return <div className={merge([css.root, props.className])}>
        <div>
        {
            scenes.map((value, key) => {
                const collectibles  = selectCollectiblesOfSceneWithPickup(value.id)(getState().data, getState().user_data).filter(value => {
                    return value.type == IStateDataSceneCollectibleType.HINT;
                });

                return <NotebookTitle
                    title={value.name}
                    key={key}
                    phonetic={value.phonetic}
                    chinese_title={value.chinese_name}
                    total={collectibles.length}
                    picked={collectibles.filter(value => value.pickup).length}
                    onClick={() => {
                      setDetailsScene(value.id);}}
                />
            })
        }
      </div>
      <div>
          <img src={"/public/images/map.png"} alt={"Map"} className={css.map} />
      </div>
        {
            (detailsScene !== null &&
                (<NotebookPageMapDetails
                    sceneId={detailsScene}
                    onClickClose={() => {
                        setDetailsScene(null)
                    }
                }/>)
            )
        }
  </div>
}

export default NotebookPageMap
