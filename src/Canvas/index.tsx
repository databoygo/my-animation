import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components"; //npm i --save-dev @types/styled-components，注意下载类型文件
// 文字雨效果
/**
 * 关键点：
 * 1.根据文字和画布的大小，设定绘制的行数和列数
 * 2.每次绘制一行（定时器控制），但不是每一列都会绘制，依次来控制每列绘制的速度
 * 3.canvas每一次调用绘制都是在一个新的图层绘制，每次绘制一行前给整个画布绘制一层半透明层，可以给之前绘制的文字施加一个逐渐消失的效果，因为越早绘制的行，其上面的半透明层越多，其文字就显得越模糊
 */

const Container = styled.div`
  width: 1500px;
  height: 500px;
  margin-left: 100px;
  border: 1px solid red;
`;
function randomInt(start: number, end: number): number {
  return ~~(Math.random() * (end - start)) + start;
}
function randomChar(): string {
  let template = "hello,skyblue";
  const idx = randomInt(0, template.length);
  return template[idx];
}
function randomColor(): string {
  let template = "0123456789abcdef";
  let colorList = Array(6)
    .fill(1)
    .map((v) => {
      const idx = randomInt(0, template.length);
      return template[idx];
    });
  const color = "#" + colorList.join("");
  return color;
}
const App = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvas.current) {
      const width = canvas.current.width;
      const height = canvas.current.height;
      const coloumnWidth = 20; //每列宽度
      const columnNumbers = width / coloumnWidth; //列数
      const nextRows = Array(columnNumbers).fill(1); //每列应该绘制哪一行

      const ctx = canvas.current.getContext("2d"); //获取元素的上下文，即canvas元素里记录图形的一个对象（或者说设置画布，是要画2d图形，3d图形还是其它的）
      const fontSize = 20;
      if (ctx) {
        const timer = setInterval(() => {
          ctx.fillStyle = "rgba(255,255,255,0.1)"; //canvas在绘画时每画一次就是在新的一层上绘制，所以每画一行就会在新的一层上加一个半透明遮罩
          ctx.fillRect(0, 0, width, height);
          ctx.font = `${fontSize}px serif`;
          for (let i = 0; i < columnNumbers; i++) {
            ctx.fillStyle = randomColor();
            if (Math.random() > 0.75) {
              //通过随机数来控制不同列的绘制速度，即某些列这一次跳过绘制（但绘制的行是没有变的）
              ctx.fillText(
                randomChar(),
                i * coloumnWidth,
                nextRows[i] * fontSize
              ); //x,y
              nextRows[i] += 1;
              nextRows[i] = nextRows[i] % (height / fontSize);
            }
          }
        }, 50);
        return () => {
          clearInterval(timer);
        };
      }
    }
  }, []);
  return (
    <Container>
      <canvas ref={canvas} width={"500"} height={"500"}></canvas>
    </Container>
  );
};
export default App;
