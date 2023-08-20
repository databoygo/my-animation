import * as React from 'react';
import { useState, useEffect } from 'react';
import style from './index.module.less';
import TransitionForm from './components/TransitionForm'
import {TransitionConfig, TransitionLabel} from './interface'
import { TrademarkCircleFilled } from '@ant-design/icons';
export interface IAppProps {
}

function handleTansitionProperty(v: string) {  //将margin-right这种形式处理为marginRight这种形式
  const idx = v.indexOf('-')
  if (idx >= 0 && idx < v.length - 1) {
    return [v.slice(0, idx), v[idx+1].toUpperCase(), v.slice(idx+2)].join('')
  } else {
    return v
  }
}

export default function App (props: IAppProps) {
  const [transitionConfig, setTransitionConfig] = useState( {  //配置transition
      [TransitionLabel.transitionProperty]: 'width, background-color, margin-top',
      [TransitionLabel.transitionDuration]: '2s',
      [TransitionLabel.transitionTimingFunction]: 'ease',
      [TransitionLabel.transitionDelay]: '0ms'
    })
  const [propertyValueRange, setPropertyValueRange] = useState<any>({ //配置需要transition的属性
    width: '200px-400px',
    'background-color': 'red-green',
    'margin-top': '20px-100px'
  })

  const [styleProperty, setStyleProperty] = useState<any>({}) //最终设置的需要transition的属性

  function changeStyleProperty(target: 'start' | 'end') { //将配置的属性转化为可设置的属性
    const styleProperty: any = {}
    for (let key in propertyValueRange) {
      styleProperty[handleTansitionProperty(key)] = propertyValueRange[key].split('-')[target == 'start' ? 0: 1]
    }
    setStyleProperty(styleProperty)
  }
  useEffect(() => { //propertyValueRange配置改变，则重新设置style
    changeStyleProperty('start')
  }, [propertyValueRange])

  return (
    <div className={style.container}>
      <TransitionForm 
        transitionConfig={transitionConfig} 
        propertyValueRange={propertyValueRange}
        onConfigChange = {(v) => { // 设置transition配置
          if (TransitionLabel.transitionProperty in v) { //如果是property改变，则要更新propertyValueRange
            const transitionPropertyList = v[TransitionLabel.transitionProperty].replaceAll(' ', '').split(',') as string[]  //末尾有,会分割出''
            const newPropertyValueRange: any = {}
            transitionPropertyList.forEach(v => {
              if (v in propertyValueRange) {
                newPropertyValueRange[v] = propertyValueRange[v]
              } else if(v) {
                newPropertyValueRange[v]= ''
              }
            })
            setPropertyValueRange(newPropertyValueRange)
          } 
          setTransitionConfig(Object.assign({}, transitionConfig, v))
        }}
        onPropertyValueChange={(v) => { //设置property配置
          setPropertyValueRange(Object.assign({}, propertyValueRange, v))
        }}
         />
     <div className={style['box-container']}>
      {/* 不同的transition属性 */}
      <div 
        className={style.box2} 
        style={
          Object.assign(
            {}, 
            {
              transitionProperty:transitionConfig[TransitionLabel.transitionProperty],
              transitionDuration: transitionConfig[TransitionLabel.transitionDuration],
              transitionDelay: transitionConfig[TransitionLabel.transitionDelay],
              transitionTimingFunction: transitionConfig[TransitionLabel.transitionTimingFunction]
            }, 
            styleProperty)}>
        <div className={style.handle}>
          <h1>通过js修改</h1>
          <button className="button" onClick={()=>changeStyleProperty('end')}>开始过渡</button>
          <button className="button" onClick={()=>changeStyleProperty('start')}>回到初始状态</button>
        </div>
      </div>
     </div>
    </div>
  );
}

