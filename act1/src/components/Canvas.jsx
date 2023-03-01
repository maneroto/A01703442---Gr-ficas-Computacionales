import { useEffect } from "react";
import { useControls } from "leva";

const Canvas = () => {
  let context;
  let initialTime = 0;
  
  const colors = useControls({
    leftEye: "rgb(138, 219, 165)",
    rightEye: "rgb(138, 219, 165)",
    mouth: "rgb(0,0,0)",
    body: "rgb(245, 255, 151)",
    head: "rgb(245, 255, 151)",
    leftLeg: "rgb(245, 255, 151)",
    rightLeg: "rgb(245, 255, 151)",
    rightArm: "rgb(245, 255, 151)",
    leftArm: "rgb(216, 215, 148)",
    neck: "rgb(216, 215, 148)",
    stroke: "rgb(0,0,0)",
  });

  const drawCharacter = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - initialTime;

    context.clearRect(0, 0 , window.innerWidth, window.innerHeight);

    // Neck
    drawRect({
      fillStyle: colors.head,
      position: { x: 724, y: 214 },
      size: { width: 34, height: 68 },
    });

    // Head
    drawRect({
      fillStyle: colors.head,
      position: { x: 600, y: 100 },
      size: { width: 200, height: 120 },
      translate: { x: 0, y: Math.sin(elapsedTime / 1000) * 3}
    });

    // Mouth
    drawRect({
      fillStyle: colors.mouth,
      position: { x: 660, y: 198 },
      size: { width: 72, height: 32 },
      translate: { x: 0, y: Math.sin(elapsedTime / 1000) * 3}
    });

    // Left Eye
    drawRect({
      fillStyle: colors.leftEye,
      position: { x: 624, y: 128 },
      size: { width: 40, height: 16 },
      translate: { x: 0, y: Math.sin(elapsedTime / 1000) * 3}
    });

    // Right Eye
    drawRect({
      fillStyle: colors.rightEye,
      position: { x: 716, y: 128 },
      size: { width: 40, height: 16 },
      translate: { x: 0, y: Math.sin(elapsedTime / 1000) * 3}
    });

    // Left leg
    drawRect({
      fillStyle: colors.leftLeg,
      position: { x: 690, y: 464 },
      size: { width: 32, height: 150 }
    });

    // Right leg
    drawRect({
      fillStyle: colors.rightLeg,
      position: { x: 800, y: 464 },
      size: { width: 32, height: 150 },
    });

    // Left arm
    drawRect({
      fillStyle: colors.leftArm,
      position: { x: 590, y: 336 },
      size: { width: 32, height: 124 },
      rotate: Math.sin(elapsedTime / 1000) * 0.01,
    });

    // Body
    drawRect({
      fillStyle: colors.body,
      position: { x: 648, y: 278 },
      size: { width: 222, height: 198 },
      translate: { x: 0, y: Math.sin(elapsedTime / 500) * 3}
    });

    // Right arm
    drawRect({
      fillStyle: colors.rightArm,
      position: { x: 892, y: 336 },
      size: { width: 32, height: 124 },
      rotate: -Math.sin(elapsedTime / 1500) * 0.008,
    });

    window.requestAnimationFrame(drawCharacter);
  }

  const drawRect = ({fillStyle = "", stroke = {}, position = {}, size = {}, rotate = 0, translate = {} }) => {
    context.save();
    context.fillStyle = fillStyle || "rgb(0,0,0)";
    context.lineWidth = stroke.width || 4;
    context.strokeStyle = stroke.style || colors.stroke;

    context.beginPath();
    context.rotate(rotate);
    context.translate(translate.x || 0, translate.y || 0)
    context.rect(position.x, position.y, size.width, size.height);
    context.fill();
    context.stroke();
    context.restore();
  }

  useEffect(() => {
    const canvas = document.querySelector("#canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    initialTime = Date.now();

    drawCharacter();
  }, [colors]);

  return (
    <>
      <noscript>
        You need to enable javascript to execute this
      </noscript>
      <canvas id="canvas">
        Your browser does not support canvas
      </canvas>
    </>
  )
}

export default Canvas;