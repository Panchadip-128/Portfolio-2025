import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  box-shadow: 0 0 10px ${({ theme }) => theme.primary};
  @media (max-width: 768px) {
    display: none;
  }
`;

const CursorRing = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border: 2px solid ${({ theme }) => theme.primary}80;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  @media (max-width: 768px) {
    display: none;
  }
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over clickable elements
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';
        
      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    }
  }, []);

  const dotVariants = {
    default: {
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
    }
  };

  const ringVariants = {
    default: {
        x: mousePosition.x - 18,
        y: mousePosition.y - 18,
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(133, 76, 230, 0.5)"
    },
    hover: {
        x: mousePosition.x - 18,
        y: mousePosition.y - 18,
        scale: 1.5,
        backgroundColor: "rgba(133, 76, 230, 0.1)",
        borderColor: "rgba(133, 76, 230, 1)"
    }
  };

  return (
    <>
      <CursorDot 
        variants={dotVariants}
        animate="default"
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <CursorRing 
        variants={ringVariants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
};

export default CustomCursor;
