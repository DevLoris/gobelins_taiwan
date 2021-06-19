import css from './PrePickupElement.module.less';
import React, {useEffect, useRef, useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {IStateDataCollectible} from "../../store/state_interface_data";
import RaycastManager, {RaycastInteractionType} from "../webGlCanvas/WebGlManagerClasses/events/RaycastManager";
import {IStateDataSceneCollectibleType} from "../../store/state_enums";
import {gsap} from "gsap";

interface IProps {
  className?: string
}

/**
 * @name PrePickupElement
 * @desc Overlay en haut à gauche de l'écran permettant d'afficher l'élément récupéré
 */
function PrePickupElement (props: IProps) {
  const [showed, toggleShowed] = useState<boolean>(false);
  const [hasPickup, toggleHasPickup] = useState<boolean>(false);
  const [collectible, setCollectible] =  useState<IStateDataCollectible>(null);

  const element = useRef();

  useEffect(() => {
      gsap.from(element.current, {autoAlpha: 0});
      RaycastManager.getInstance().onInteract.add((type: RaycastInteractionType, value: IStateDataCollectible, hasPickupPayload = false) => {
          // On affiche si on clique sur un PRE_PICKUP sinon ignoré ici
          if(type == RaycastInteractionType.ELEMENTS) {
              if ([IStateDataSceneCollectibleType.PRE_PICKUP].includes(value.type)) {
                  setCollectible(value);
                  toggleHasPickup(hasPickupPayload);
                  toggleShowed(true);
              } else if ([IStateDataSceneCollectibleType.PICKUP].includes(value.type)) {
                  toggleShowed(false);
              }
          }
      });
  }, []);

    useEffect(() => {
        if(showed) {
            let tl = gsap.timeline();
            tl
                .fromTo(element.current, {scale: 1}, {scale: 1.2, autoAlpha: 1})
                .to(element.current, {scale: 1})
                .to(element.current, {scale: 1.2})
                .to(element.current, {scale: 1})
        }
        else {
            gsap.from(element.current, {autoAlpha: 0});
        }
    }, [showed]);

  if(hasPickup) {
      return <div ref={element} className={merge([css.root, props.className])}>
          {collectible  != null && (<img src={collectible.asset} alt={"asset"} />)}
          <svg className={css.svg} xmlns="http://www.w3.org/2000/svg" width="28.163" height="26.578" viewBox="0 0 28.163 26.578">
              <g id="Groupe_2492" data-name="Groupe 2492" transform="translate(-259.451 -108.68)">
                  <g id="Groupe_2437" data-name="Groupe 2437" transform="translate(-345.883 227.603)">
                      <g id="Tracé_2521" data-name="Tracé 2521" fill="#afd56e">
                          <path d="M 619.382568359375 -93.10489654541016 L 614.4276733398438 -93.7708740234375 L 610.1260986328125 -96.42877197265625 L 607.2972412109375 -100.6893844604492 L 606.1167602539062 -105.6416473388672 L 607.9111328125 -110.4208526611328 L 610.3251953125 -114.8170623779297 L 614.458251953125 -117.5576782226562 L 619.4139404296875 -118.1687622070312 L 624.3795166015625 -117.6636810302734 L 628.3473510742188 -114.6449661254883 L 631.298583984375 -110.5658264160156 L 632.7095947265625 -105.711181640625 L 631.0304565429688 -100.8864135742188 L 628.7066040039062 -96.38742828369141 L 624.2643432617188 -94.06917572021484 L 619.382568359375 -93.10489654541016 Z" stroke="none"/>
                          <path d="M 619.4219360351562 -117.4140777587891 L 614.7254028320312 -116.8349533081055 L 610.8936767578125 -114.2940902709961 L 608.5944213867188 -110.1069793701172 L 606.8994750976562 -105.5926055908203 L 607.9959106445312 -100.9930725097656 L 610.6600341796875 -96.98046112060547 L 614.6859741210938 -94.49289703369141 L 619.3591918945312 -93.86477661132812 L 624.0131225585938 -94.78404235839844 L 628.149169921875 -96.94252014160156 L 630.339599609375 -101.1832504272461 L 631.922607421875 -105.7316818237305 L 630.6146850585938 -110.2315979003906 L 627.8048706054688 -114.1152954101562 L 624.0934448242188 -116.9389114379883 L 619.4219360351562 -117.4140777587891 M 619.4058837890625 -118.923454284668 L 624.66552734375 -118.3884582519531 L 628.889892578125 -115.1745834350586 L 631.9824829101562 -110.9000625610352 L 633.49658203125 -105.6906890869141 L 631.7212524414062 -100.5895690917969 L 629.2640380859375 -95.83235168457031 L 624.515625 -93.35432434082031 L 619.4058837890625 -92.34500885009766 L 614.1693725585938 -93.04884338378906 L 609.5921020507812 -95.87708282470703 L 606.5986328125 -100.3857040405273 L 605.3340454101562 -105.6906890869141 L 607.2279052734375 -110.7348022460938 L 609.7567138671875 -115.3400039672852 L 614.1910400390625 -118.2804107666016 L 619.4058837890625 -118.923454284668 Z" stroke="none" fill="#111d30"/>
                      </g>
                  </g>
                  <g id="Groupe_2442" data-name="Groupe 2442" transform="matrix(0.996, -0.087, 0.087, 0.996, 266.905, 117.688)">
                      <g id="Groupe_2441" data-name="Groupe 2441" transform="translate(0 0)">
                          <g id="Groupe_2440" data-name="Groupe 2440">
                              <g id="Groupe_2439" data-name="Groupe 2439">
                                  <path id="Tracé_2523" data-name="Tracé 2523" d="M48.238,62.141c-3.276.946-5.841,4.083-7.6,7.054l-1.961-2.652c-.695-.94-2.289-.025-1.585.927l2.861,3.87a.93.93,0,0,0,1.585,0,24.416,24.416,0,0,1,2.117-3.255c1.3-1.7,2.952-3.559,5.074-4.172A.919.919,0,0,0,48.238,62.141Z" transform="translate(-36.913 -62.101)" fill="#111d30"/>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
          </svg>
      </div>
  }
  else {
      return <div ref={element} className={merge([css.root, props.className])}>
          {collectible != null && (<img src={collectible.asset} alt={"asset"} />)}
          <svg className={css.svg} xmlns="http://www.w3.org/2000/svg" width="28.163" height="26.578" viewBox="0 0 28.163 26.578">
              <g id="Groupe_2491" data-name="Groupe 2491" transform="translate(-259.451 -108.68)">
                  <g id="Groupe_2437" data-name="Groupe 2437" transform="translate(-345.883 227.603)">
                      <path id="Tracé_2521" data-name="Tracé 2521" d="M633.5-105.691l-1.775,5.1-2.457,4.757-4.748,2.478-5.11,1.009-5.237-.7-4.577-2.828-2.993-4.509-1.265-5.3,1.894-5.044,2.529-4.605,4.434-2.94,5.215-.643,5.26.535,4.224,3.214,3.093,4.275Z" fill="#111d30"/>
                  </g>
                  <text id="_0" data-name="0" transform="translate(268.532 124.607)" fill="#fff" fontSize="14" fontFamily="Fuji-Light, Fuji" fontWeight="300" letterSpacing="-0.01em"><tspan x="-4.158" y="0">0</tspan></text>
                  <text id="_1" data-name="1" transform="translate(278.5 129.5)" fill="#fff" fontSize="9" fontFamily="Fuji-Light, Fuji" fontWeight="300" letterSpacing="-0.01em"><tspan x="-1.625" y="0">1</tspan></text>
                  <line id="Ligne_331" data-name="Ligne 331" y1="14" x2="7" transform="translate(271.5 115.5)" fill="none" stroke="#fff" strokeWidth="1"/>
              </g>
          </svg>
      </div>
  }
}

export default PrePickupElement
