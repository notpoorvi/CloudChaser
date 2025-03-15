"use client";

import { useEffect, useState, MouseEvent, MouseEventHandler } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";

import RiveButton from "./RiveButton";
import React from "react";

// @refresh reset

export default function RiveAnimation() {
  const [lastWidth, setLastWidth] = useState(0);
  const [lastHeight, setLastHeight] = useState(0);

  const {
    rive,
    setCanvasRef,
    setContainerRef,
    canvas: canvasRef,
    container: canvasContainerRef,
  } = useRive(
    {
      src: "/cloudchaser.riv",
      artboard: "artboard",
      stateMachines: "State Machine 1",
      layout: new Layout({
        fit: Fit.Cover,
        alignment: Alignment.Center,
      }),
      autoplay: true,
    },
    {
      // We disable the automatic resize logic in Rive React runtime so we can manipulate
      // sizing manually, which is necessary for our adaptive layout effect
      shouldResizeCanvasToContainer: false,
    }
  );

  const numX = useStateMachineInput(rive, "State Machine 1", "numX", 50);
  const numY = useStateMachineInput(rive, "State Machine 1", "numY", 50);
  const numSize = useStateMachineInput(rive, "State Machine 1", "numSize", 0);

  // Drive the mouse positon inputs for the state machine based on cursor mouse movement position
  const onMouseMove: MouseEventHandler<HTMLDivElement> = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    if (!numX || !numY) {
      return;
    }
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    numX.value = (e.clientX / maxWidth) * 100;
    numY.value = 100 - (e.clientY / maxHeight) * 100;
  };

  return (
    <div
    >
      <canvas
        className="rive-canvas w-full h-full"
        ref={setCanvasRef}
        style={{ width: "100%", height: "100%",  objectFit: "cover"}}
        aria-label="Hero element for the Explore page; an interactive graphic showing planets thru a spacesuit visor"
      ></canvas>
    </div>
  );
}