import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components"; //npm i --save-dev @types/styled-components，注意下载类型文件
//*********暂时要取消react的StrictMode模式才能实现 */
/**
 * Flip动画是一种动画解决方案，分为四个步骤：
 * F：First，记录起始位置
 * L：Last，记录结束位置
 * I：Invert，反转元素到起始位置（当元素位置移动过后，通过transform将元素移动到原来的位置）
 * P：Play，播放动画回到结束位置（取消transform属性，再过渡回去）
 */
const Container = styled.div`
  width: 1500px;
  height: 1000px;
  margin-left: 100px;
  margin-bottom: 100px;
  overflow: auto;
  border: 1px solid red;
`;
const FlexBox = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 20px auto;
  /* border: 1px solid black; */
`;
const FlexItem = styled.div`
  width: 150px;
  height: 50px;
  background-color: pink;
`;
const InvertButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 20px;
`;
const FlipItem: React.FC<{ children: ReactNode; v: number }> = (props) => {
  const curPosition = useRef({ x: 0, y: 0 });
  const r = useRef(Math.random());
  //   为什么需要startPlay和startInverse这两个标志位，首先进行翻转操作的前提是检测到发生位置移动，但本质上翻转操作也是位置移动，导致循环，所以需要startInverse来标志当前的DOM更新是翻转操作造成的还是用户操作造成的。
  //   startPlay是标志当前翻转操作已经完成，应该执行播放操作。
  const startPlay = useRef(false);
  const startInverse = useRef(false);
  const [offsetXY, setOffsetXY] = useState({ x: 0, y: 0 });
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (node.current !== null) {
      // 1.F记录起始位置
      const rect = node.current.getBoundingClientRect();
      curPosition.current = { x: rect.x, y: rect.y };
      startInverse.current = true; //开启观察
    }
  }, []);
  useEffect(() => {
    console.log(node, startInverse.current, startPlay.current)

    if (node.current !== null) {
      const rect = node.current.getBoundingClientRect();
      const newPosition = { x: rect.x, y: rect.y }; //2.L:移动的新位置
      //计算偏移
      const offset = [
        -newPosition.x + curPosition.current.x,
        -newPosition.y + curPosition.current.y,
      ];

      if (startInverse.current === true && startPlay.current === false) {
        curPosition.current.x = newPosition.x; //记录当前真实位置
        curPosition.current.y = newPosition.y;
        setOffsetXY({ x: offset[0], y: offset[1] }); //3.I，翻转
        startPlay.current = true; //可以开始播放
        startInverse.current = false;
      } else if (
        startPlay.current === true &&
        startInverse.current === false
      ) {
        setOffsetXY({ x: 0, y: 0 }); //4.P，播放，使用transition
        startPlay.current = false;
      } else if (
        startPlay.current === false &&
        startInverse.current === false
      ) {
        startInverse.current = true; //播放完毕后，继续观察，准备翻转
      }
    }
  });
  console.log(startPlay.current)
  return (
    <div
      ref={node}
      style={{
        transform: `translate(${offsetXY.x}px, ${offsetXY.y}px)`,
        transition: startPlay.current ? "" : "transform 1s",
      }}
    >
      {props.children}
      {r.current}
    </div>
  );
};
// 犯过的错：1.设置了动画和transition时，元素的位置不是动画结束时的位置，而是检测时，元素实际在那个位置就在那个位置，比如transition 1s，那么在0.5s检测位置时是它移动了0.5s所处的位置，不是移动完之后
// 2.transition设置后立即生效，比如通过js设置transition: "transform 1s"后，如果在设置的那一刻transfrom有变化，则transition就会生效（就像:hover一样，如果transition设置在:hover里，则鼠标移入立即生效，块会缓慢移动，鼠标移出后transition效果立即消失，因此鼠标移出后块会立即复原，而不是缓慢复原）
//3.useEffect是在DOM更新后执行
const App = () => {
  const [itemList, setItemList] = useState([0, 1, 2, 3]);
  function reverse() {
    setItemList((v) => {
      v = [...v].reverse();
      return v;
    });
  }
  return (
    <Container>
      <InvertButton onClick={reverse}>翻转</InvertButton>
      <FlexBox>
        {itemList.map((v) => {
          return (
            <FlipItem key={v} v={v}>
              <FlexItem>{v}</FlexItem>
            </FlipItem>
          );
        })}
      </FlexBox>
    </Container>
  );
};
export default App;
