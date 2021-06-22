import css from './NotebookPageMap.module.less';
import React, {useState} from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import NotebookTitle from "../notebookTitle/NotebookTitle";
import {selectCollectiblesOfSceneWithPickup, selectScenes, selectUserScene} from "../../../store/store_selector";
import {getState} from "../../../store/store";
import NotebookPageMapDetails from "../notebookPageMapDetails/NotebookPageMapDetails";
import NotebookSignal from "../notebook-signal";
import {IStateDataSceneCollectibleType} from "../../../store/state_enums";
import NotebookPageMapPin from "../notebookPageMapPin/NotebookPageMapPin";

interface IProps {
  className?: string
}

/**
 * @name NotebookPageMap
 * @desc Page map du carnet
 */
function NotebookPageMap (props: IProps) {
    // get all scenes (for map pins)
    let scenes = selectScenes(getState());

    // toggle popup for details
    let [detailsScene, setDetailsScene] = useState<string>(null);

    // reset to close details page
    NotebookSignal.getInstance().mapDetails.add((value) =>  {
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

                const userScene  = selectUserScene(value.id)(getState().user_data);

                if(userScene.visible_on_map)
                    return <NotebookTitle
                        title={value.name}
                        key={key}
                        className={"border"}
                        pin={value.map.pin}
                        phonetic={value.phonetic}
                        chinese_title={value.chinese_name}
                        total={collectibles.length}
                        picked={collectibles.filter(value => value.pickup).length}
                        onClick={() => {
                          setDetailsScene(value.id);
                        }}
                    />
            })
        }
      </div>
      <div className={css.mapContainer}>
          {
              scenes.map((value, key) => {
                  const userScene  = selectUserScene(value.id)(getState().user_data);
                  if(userScene.visible_on_map)
                      return(
                          <NotebookPageMapPin key={key} x={value.map.x} y={value.map.y} content={value.map.pin} onClick={() =>  {
                              setDetailsScene(value.id);
                          }}/>
                      )
              })
          }
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
