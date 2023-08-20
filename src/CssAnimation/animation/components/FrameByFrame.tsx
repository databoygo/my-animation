import React from "react";
import styled, {keyframes} from "styled-components"; //npm i --save-dev @types/styled-components，注意下载类型文件
import img from './run1.png'  //引入静态文件
// 逐帧动画步骤
// 1.将雪碧图作为背景图引入
// 2.设置动画帧，将背景图从0位置向左移动，直到整个图片移出显示框（为什么用移出显示框？使得最后一帧会和第一帧之间空一帧，否则这两帧会无缝衔接，使得帧与帧之间的间隔不均匀）
// 3.设置动画属性animation，配置动画执行完需要1s，执行次数为无限重复，使用steps(n)函数表示使用逐帧动画，即把整个动画分为n张图，在1s内均匀展示这n张图。（效果为首先第一张图出现，间隔1/12秒出现第二张图....出现第12张图，间隔1/12s出现空白，然后动画重复，立即出现第一张图，相当于每张图出现1/12秒）
// 4.如果要小人在屏幕中跑动起来，则额外添加一个动画，移动显示框。小人是1/12秒切换一次，每两次移动一步，也就是1/6秒移动一步，所以显示框的移动最好也是1/6s移动一次。                 ${frameToframeMove} 5s infinite steps(30);
// 5.当然，跑动可以不使用逐帧动画，而使用补间动画，这样更丝滑,linear表示匀速运动，即整个画面是匀速变化的。linear和steps都是调整画面变化速度的函数

// 动画暂停和恢复
// 1.通过动画的animation-play-state属性可以设置动画停止与运行，值为paused和running


// 每帧的宽度为300px
//定义动画帧，需要导入keyframes (逐帧动画)，从0位置移到到最后一帧图片
const frameToframe = keyframes`   
    from {
        background-position: 0px 0;
    }
    to {
        background-position: -3600px 0;

    }
`;
const frameToframeMove = keyframes`
    from {
        transform: translateX(-310px);
    }
    to {
        transform: translateX(1500px);
    }
`
//图片是3600 * 372 12帧
const Container = styled.div`
    width: 1500px;
    margin-left: 100px;
    overflow: hidden;
    border: 1px solid red;

`;
const Animation = styled.div`
    color: red;
    height: 380px;
    width: 300px;
    background-image: url(${img});
    background-repeat: no-repeat; //背景图有自己的尺寸，如果容器尺寸过大，不重复贴图
    animation: ${frameToframe} 1s infinite steps(12),
                ${frameToframeMove} 5s infinite linear;
    &:hover {  //使用&表示父级元素
        animation-play-state: paused;
    };
`;

const App = () => {
    return (
        <Container>
            <Animation></Animation>
        </Container>
    )
}
export default App;