import { useEffect, useState } from "react";

export const useMouseControls = () => {
  const [mouseState, setMouseState] = useState({
    isLeftMouseDown: false,
    isRightMouseDown: false,
    lastX: 0,
    lastY: 0,
    movementX: 0,
    movementY: 0,
  });

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // e.button: 0 = left, 2 = right
      setMouseState((prev) => ({
        ...prev,
        isLeftMouseDown: e.button === 0 ? true : prev.isLeftMouseDown,
        isRightMouseDown: e.button === 2 ? true : prev.isRightMouseDown,
        lastX: e.clientX,
        lastY: e.clientY,
      }));
    };

    const handleMouseUp = (e: MouseEvent) => {
      setMouseState((prev) => ({
        ...prev,
        isLeftMouseDown: e.button === 0 ? false : prev.isLeftMouseDown,
        isRightMouseDown: e.button === 2 ? false : prev.isRightMouseDown,
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement) {
        setMouseState((prev) => ({
          ...prev,
          movementX: e.movementX,
          movementY: e.movementY,
        }));
      } else if (mouseState.isRightMouseDown) {
        // Calculate movement for orbital rotation
        setMouseState((prev) => ({
          ...prev,
          movementX: e.clientX - prev.lastX,
          movementY: e.clientY - prev.lastY,
          lastX: e.clientX,
          lastY: e.clientY,
        }));
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // Prevent context menu from appearing
    };

    const handlePointerLockChange = () => {
      if (!document.pointerLockElement) {
        setMouseState((prev) => ({
          ...prev,
          isLeftMouseDown: false,
          movementX: 0,
          movementY: 0,
        }));
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
    };
  }, [mouseState.isRightMouseDown]);

  return mouseState;
};
