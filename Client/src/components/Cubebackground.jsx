import React from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import { useTransform, useScroll, useTime } from "framer-motion";
import { degreesToRadians, progress, mix } from "popmotion";

const color = "#ffffff"; // White for edges
const emissiveColor = "#ffffff"; // Violet for radiance
const backgroundColor = "#000000"; // Black background

const Icosahedron = () => (
  <mesh rotation-x={0.35}>
    <icosahedronGeometry args={[1.2, 1]} /> {/* Reduced detail */}
    <meshBasicMaterial wireframe color={color} />
  </mesh>
);

const RadiatingCube = ({ p }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const distance = mix(2, 6, Math.random());
    const yAngle = mix(
      degreesToRadians(80),
      degreesToRadians(100),
      Math.random()
    );
    const xAngle = degreesToRadians(360) * p;
    ref.current.position.setFromSphericalCoords(distance, yAngle, xAngle);
  }, [p]);

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} /> {/* Small cube size */}
      <meshStandardMaterial
        color={color}
        emissive={emissiveColor} // Radiating violet
        emissiveIntensity={2} // Adjust intensity of radiance
      />
    </mesh>
  );
};

function Scene({ numCubes = 100 }) {
  const gl = useThree((state) => state.gl);
  const { scrollYProgress } = useScroll();
  const yAngle = useTransform(
    scrollYProgress,
    [0, 0.35],
    [0.001, degreesToRadians(180)]
  );
  const distance = useTransform(scrollYProgress, [0, 1], [10, 16]);
  const time = useTime();

  // Map scroll progress to scale
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]); // Decrease size as scrolling increases

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      time.get() * 0.0001 // Slower spinning speed
    );
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  useLayoutEffect(() => gl.setPixelRatio(window.devicePixelRatio || 1), [gl]);

  const cubes = [];
  for (let i = 0; i < numCubes; i++) {
    cubes.push(<RadiatingCube key={i} p={progress(0, numCubes, i)} />);
  }

  const additionalOrbits = [];
  for (let i = 0; i < 2; i++) {
    const offset = degreesToRadians(180 * i);
    additionalOrbits.push(
      cubes.map((cube, idx) => (
        <RadiatingCube
          key={`${i}-${idx}`}
          p={progress(0, numCubes, idx) + offset}
        />
      ))
    );
  }

  return (
    <>
      <Icosahedron />
      {cubes}
      {additionalOrbits}
    </>
  );
}

export default function CubeBackground() {
  return (
    <div
      className="container"
      style={{
        width: "150vw",
        height: "150vh",
        overflow: "hidden",
      }}
    >
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <ambientLight intensity={0.5} />{" "}
        {/* Ambient light for overall illumination */}
        <pointLight position={[10, 10, 10]} intensity={1} />{" "}
        {/* Point light for the scene */}
        <Scene />
      </Canvas>
    </div>
  );
}
