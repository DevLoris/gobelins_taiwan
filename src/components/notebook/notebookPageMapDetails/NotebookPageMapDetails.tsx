import css from './NotebookPageMapDetails.module.less';
import React from 'react';
import {merge} from "../../../lib/utils/arrayUtils";
import {selectScene} from "../../../store/store_selector";
import {getState} from "../../../store/store";
import {useTranslation} from "react-i18next";
import {WebGlManager} from "../../webGlCanvas/WebGlManagerClasses/WebGlManager";
import Button, {ButtonStyle} from "../../button/Button";
import NotebookSignal from "../notebook-signal";
import {SceneVars} from "../../../vars/scene_vars";

interface IProps {
  className?: string,
  sceneId: string,
  onClickClose: () => void,
}

/**
 * @name NotebookPageMapDetails
 * @desc Affiche une popup permettant de changer de zone ou non
 *
 */
function NotebookPageMapDetails (props: IProps) {
  // use translation
  const { t } = useTranslation();

  // get scene data by name
  let sceneData = selectScene(props.sceneId)(getState().data);

  return <div className={merge([css.root, props.className, "popup mapPopup"])}>
    <p>
      {t('notebook__page__map__popup__title', {area: sceneData.name})}
    </p>
    <div className={"buttonGroup"}>
    <Button style={ButtonStyle.DEFAULT} onClick={() =>  { NotebookSignal.getInstance().mapDetails.dispatch(true);}} label={t('notebook__page__map__label__stay')}/>
    <Button style={ButtonStyle.PATTERN} onClick={() =>  {
      if(sceneData.id == SceneVars.WILD)
        WebGlManager.getInstance().toggleScenery(SceneVars.AIRPORT);
      else
        WebGlManager.getInstance().toggleScenery(sceneData.id);

    }} label={t('notebook__page__map__label__goto')}/>
    </div>
  </div>
}

export default NotebookPageMapDetails
