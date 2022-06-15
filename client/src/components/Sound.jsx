import React from "react";
import { useState } from "react";
import useSound from "use-sound";
import soundUrl from "../assets/sounds/menu.wav";

export const Sound = () => {
  const [isActive, setIsActive] = useState(false);

  const [play, { stop }] = useSound(soundUrl, {
    volume: 0.1,
  });

  const handleClick = () => {
    if (isActive) {
      stop();
      setIsActive(false);
    } else {
      play();
      setIsActive(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ width: "3vw", display: "flex", justifyContent: "center" }}
    >
      <i className="material-icons">{isActive ? "volume_up" : "volume_off"}</i>
    </div>
  );
};
