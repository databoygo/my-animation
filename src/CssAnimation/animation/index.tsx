import * as React from 'react';
import { useState, useEffect } from 'react';
import style from './index.module.less';
import FrameByFrame from './components/FrameByFrame'
import Tween from './components/Tween'

import {TransitionConfig, TransitionLabel} from './interface'
import { TrademarkCircleFilled } from '@ant-design/icons';
export interface IAppProps {
}


export default function App (props: IAppProps) {
  return (
    <div className={style.container}>
      {/* <FrameByFrame></FrameByFrame> */}
      <Tween></Tween>
    </div>
  );
}

