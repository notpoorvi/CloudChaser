import { useCallback } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import React from "react";

export default function RiveButton() {
  const { rive, RiveComponent } = useRive({
    src: "/cloudchaser.riv",
    artboard: "artboard",
    stateMachines: "State Machine 1",
    autoplay: true,
    shouldDisableRiveListeners: true,
  });

  const isHoverInput = useStateMachineInput(rive, "State Machine 1", "isHover");

  const onButtonActivate = useCallback(() => {
    if (rive && isHoverInput) {
      isHoverInput.value = true;
    }
  }, [rive, isHoverInput]);

  const onButtonDeactivate = useCallback(() => {
    if (rive && isHoverInput) {
      isHoverInput.value = false;
    }
  }, [rive, isHoverInput]);

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0">
      <RiveComponent aria-hidden="true" />
    </div>
  );
}