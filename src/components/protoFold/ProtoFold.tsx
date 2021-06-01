import css from './ProtoFold.module.less';
import React, {useEffect, useLayoutEffect, useRef} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {gsap} from "gsap";

const TILE_HEIGHT_PX = 100;

interface IProps {
  className?: string
}

const componentName = "ProtoFold";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name ProtoFold
 */
function ProtoFold (props: IProps) {

  const tilesRefs = useRef([]);

  function isEven(value): boolean {
    return value % 2 == 0;
  }

  // useLayoutEffect(() => {
  //
  //   tilesRefs.current.map((tile, index) => {
  //
  //     // Not on first
  //     if(index > 0) {
  //
  //       gsap.set(tile, {
  //         rotateX: isEven(index) ? 90 : -90,
  //
  //       });
  //
  //     }
  //
  //   });
  //
  //   tilesRefs.current.shift();
  //
  //   let parentNodesEls = tilesRefs.current.map((tileEl) => {
  //     return tileEl.parentNode;
  //   });
  //
  //   // gsap.set([parentNodesEls[1], parentNodesEls[2]], {
  //   //   y: -100
  //   // });
  //
  //   gsap.delayedCall(1, () => {
  //
  //     // Set perspective
  //     gsap.set(parentNodesEls, {
  //       duration: 0,
  //       perspective: 500,
  //       // stagger: {
  //       //   each: .5,
  //       // }
  //     });
  //
  //     // Move parents distance to previous element
  //     // gsap.to([parentNodesEls[1], parentNodesEls[2]], {
  //     //   delay: .1,
  //     //   duration: 10,
  //     //   y: 0
  //     // });
  //
  //     // Rotate
  //     gsap.to(tilesRefs.current, {
  //       delay: .1,
  //       duration: 10,
  //       rotateX: 0,
  //       // stagger: {
  //       //   each: .5,
  //       //
  //       // }
  //     });
  //   });
  //
  //   // setInterval(() => {
  //   //   console.log(tilesRefs.current[2].offsetWidth);
  //   // }, 500);
  //
  // }, []);
  //
  //
  // function buildtiles() {
  //   let tilesEls = [];
  //   for( let i = 0 ; i < 4 ; i++ ) {
  //     tilesEls.push(
  //         <div key={i} className={css.tileContainer}>
  //           <div key={i} ref={(r) => tilesRefs.current[i] = r} className={css.tile}>{i}</div>
  //         </div>
  //     );
  //   }
  //   return tilesEls;
  // }
  //
  // const lolRef = useRef();
  // const lol2Ref = useRef();
  //

  useEffect(() => {

    let play = true;

    flapsAnim(play);

    setInterval(() => {
      play = !play;
      flapsAnim(play);
    }, 2000);

  }, []);

  function flapsAnim(pPlayIn) {

    const animParams = {
      borderLeftWidth: pPlayIn ? 0 : 50,
      borderRightWidth: pPlayIn ? 0 : 50,
      duration: 2,
      delay: 1,
      ease: "power4.easeOut"
    };

    tilesRefs.current.map((tile, index) => {
      gsap.to(tile, isEven(index)
          ? { ...animParams, borderBottomWidth: pPlayIn ? 80 : 0 }
          : { ...animParams, borderTopWidth: pPlayIn ? 80 : 0 }
      );
    });
  }

  function buildTrapezes() {
    let tilesEls = [];
    for( let i = 0 ; i < 7 ; i++ ) {
      tilesEls.push(
          <div key={i} ref={i > 0 ? (r) => tilesRefs.current[i] = r : null} className={css.trapeze}>
            {/*{i}*/}
          </div>
      );
    }
    return tilesEls;
  }

  return <div className={merge([css.root, props.className])}>

    <div className={css.lolContainer}>
      {buildTrapezes()}
    </div>

    {/*<div className={css.foldContainer}>*/}
    {/*  {buildtiles()}*/}
    {/*</div>*/}

  </div>
}

export default ProtoFold;
