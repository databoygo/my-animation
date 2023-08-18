import * as React from 'react';
import { useState } from 'react';
import './index.less';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  const [width, setWidth] = useState('200px')


  return (
    <div className="container">
      <div className="box1">
        <h1>鼠标移入变换，通过css修改</h1>
      </div>
      <div className="box2" style={{width: width}}>
        <div className="handle">
          <h1>通过js修改</h1>
          <button className="button" onClick={()=>setWidth('400px')}>变为400</button>
          <button className="button" onClick={()=>setWidth('200px')}>变为200</button>
        </div>
      </div>
      
    </div>
  );
}

