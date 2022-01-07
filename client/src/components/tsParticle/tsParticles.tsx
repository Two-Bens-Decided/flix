
import React, { FC, useState } from 'react';
import Particles, { tsParticles } from 'react-tsparticles';
import './tsStyle.css';


const TsParticles:FC<any> = () => {
  const particlesInit = (main: any) => {
    console.log('start', main)
  }

  const particlesLoaded = (container: any) => {
    console.log(container);
  }



  return (
    <>
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: '#000000',
          },
        },
        fpsLimit: 45,
        interactivity: {
          detect_on: 'window',
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#CF5C36',
          },
          links: {
            color: '#EFC88B',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 2,
            straight: false,
            bounce: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />
    </>
  );
};


export default TsParticles;