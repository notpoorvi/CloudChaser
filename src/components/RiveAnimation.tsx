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
      src: "/hero_use_case.riv",
      artboard: "Hero Demo Listeners Resize",
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

  // On larger viewports, display the entire artboard while maintaining aspect ratio
  // On smaller viewports, cover the viewport with the artboard while maintaining aspect ratio
  // which may crop certain parts of the artboard
  useEffect(() => {
    if (rive) {
        rive!.layout = new Layout({
          fit: Fit.Cover,
          alignment: Alignment.Center,
        });
      }
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
      className="bg-[#09090E] relative rive-canvas-container w-full h-full"
      style={{ width: "100%", height: "100%" }}
      ref={setContainerRef}
      onMouseMove={onMouseMove}
    >
      <canvas
        className="bg-[#09090E] rive-canvas block relative w-full h-full max-h-screen max-w-screen align-top"
        ref={setCanvasRef}
        style={{ width: "100%", height: "100%" }}
        aria-label="Hero element for the Explore page; an interactive graphic showing planets thru a spacesuit visor"
      ></canvas>
      <RiveButton />
    </div>
  );
}