import css from './FakeLoader.module.less';
import React, {useEffect, useRef} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {gsap} from "gsap";
import lottie from "lottie-web";

interface IProps {
  className?: string,
  message?:string
}

const componentName = "FakeLoader";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name FakeLoader
 */
function FakeLoader (props: IProps) {
  const ref = useRef();
  const loaderRef = useRef();

  const lottieAnimationElementRef = useRef(null);
  const lottieAnimationElementContainerRef = useRef(null);

  useEffect(() => {
    // lottie
    lottieAnimationElementRef.current = lottie.loadAnimation({
      container:lottieAnimationElementContainerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "/public/lotties/Loader.json",
      rendererSettings: {
        preserveAspectRatio: "xMidYMid",
      },
    });
    lottieAnimationElementRef.current.setSpeed(1.6);

    gsap.delayedCall(1, () => {
      lottieAnimationElementRef.current.goToAndPlay(0);
    })
  }, []);

  useEffect(() => {
    if(props.message == null) {
      gsap.to(ref.current, {autoAlpha: 0, duration: 0});
    }
    else {
      gsap.to(ref.current, {autoAlpha: 1, duration: 0});
      gsap.fromTo(loaderRef.current, {width: 0}, {width: "100%", duration: 6});
      gsap.delayedCall(6, () => {
        gsap.to(ref.current, {autoAlpha: 0});
      })
    }
  }, [props.message]);

  return <div ref={ref} className={merge([css.root, props.className])}>
    <div className={css.topPart}>
      <div className={css.lottieContainer} ref={lottieAnimationElementContainerRef} />
      <div className={css.message}>
        {props.message}
      </div>
    </div>
    <div className={css.loader}>
      <div ref={loaderRef}/>
    </div>
  </div>
}

export default FakeLoader
