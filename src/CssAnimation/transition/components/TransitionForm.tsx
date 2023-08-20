import React, { useState } from 'react';
import { Button, Form, Input, Tooltip } from 'antd';
import { Card, Space } from 'antd';
import {TransitionLabel, TransitionConfig} from '../interface'
type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

const label = [TransitionLabel.transitionProperty, 
  TransitionLabel.transitionDuration, TransitionLabel.transitionTimingFunction,
  TransitionLabel.transitionDelay
]
const labelDesc = {
  [TransitionLabel.transitionProperty]: '需要过渡变换的属性,多个属性通过‘，’号隔开',
  [TransitionLabel.transitionDuration]: '过渡变换的时长',
  [TransitionLabel.transitionTimingFunction]: '过渡变换的方式',
  [TransitionLabel.transitionDelay]: '过渡开始执行的延时'
}

export interface IAppProps {
  transitionConfig: TransitionConfig
  propertyValueRange: {[key:string]: ''}
  onConfigChange: (changedValues: any) => void
  onPropertyValueChange: (changedValues: any) => void

}
const App: React.FC<IAppProps> = (props) => {
  const [transitionConfigForm] = Form.useForm();
  const [propertyValueForm] = Form.useForm();
  const onTransitionConfigChange = (changedValues:any, allValues:any) => {
    props.onConfigChange(changedValues)
  };
  const onTransitionPropertyChange = (changedValues:any, allValues:any) => {
    props.onPropertyValueChange(changedValues)

  };
  return (
    <>
    <Form
      key='1'
      validateTrigger='onBlur'
      layout='inline'
      form={transitionConfigForm}
      initialValues={props.transitionConfig}
      onValuesChange={onTransitionConfigChange}
      style={{ minWidth: 900 }}
    >
      {label.map((v, idx) => {
        return (
          <Space  key={idx} direction="vertical" size={16}>
            <Card 
              title={<Form.Item label={v} name={v}>
                        <TextArea placeholder="input placeholder" autoSize/>
                    </Form.Item>}  
              style={{ width: 420 }}
            >
              {labelDesc[v]}
            </Card>
          </Space>
        )
      })}
    </Form>
    <Form
      key='2'
      layout='inline'
      form={propertyValueForm}
      initialValues={props.propertyValueRange}
      onValuesChange={onTransitionPropertyChange}
      style={{ minWidth: 900, marginTop: '10px' }}
    >
      {Object.keys(props.propertyValueRange).map(v => {
        return(
          <Tooltip title="请输入过渡开始和过渡结束时的属性值，用-隔开，如20px-40px">
            <Form.Item key={v} label={v} name={v}>
                <Input placeholder="input placeholder" />
            </Form.Item>
          </Tooltip>
        )
      })}
      </Form>
    </>
  );
};

export default App;