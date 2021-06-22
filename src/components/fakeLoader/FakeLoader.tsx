import css from './FakeLoader.module.less';
import React, {useEffect, useRef} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {gsap} from "gsap";

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
    <div className={css.homepageContent}>
      <img src={"/public/da/logo_beige.svg"} className={css.logo} alt={"logo"}/>
    </div>
    <div className={css.message}>
      {props.message}
    </div>
    <div className={css.loader}>
      <div ref={loaderRef}/>
    </div>
  </div>
}

export default FakeLoader
