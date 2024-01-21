// Tooltip.js

import React, { useState, useEffect, useContext } from "react";

import "./Calendar.css";

export const mousePosition = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

export const TooltipContext = React.createContext({
  component: null,
  setValue: () => {},
});

export const Tooltip = ({ event }) => {
  console.log(event);
  const [position, setPosition] = useState({
    x: mousePosition.x,
    y: mousePosition.y,
  });

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div
      className="tooltip"
      style={{
        position: "fixed",
        left: `${position.x + 10}px`,
        top: `${position.y + 10}px`,
        pointerEvents: "none", // This ensures that the tooltip does not interfere with other mouse events
      }}
    >
      <p>Date: {(new Date(event.Date)).toDateString()}</p>
      <p>Event Title: {event["Event Title"]}</p>
      {/* <p>Username: {event.ig_username}</p> */}
      <p>Start Time: {event["Start Time"]}</p>
      <p>End Time: {event["End Time"]}</p>
      <p>Event Description: {event["Event Description"]}</p>
      <p>Location: {event.Location}</p>
    </div>
  );
};

export const TooltipContainer = () => {
  const tooltip = useContext(TooltipContext);
  // return null;
  return tooltip.component;
};
