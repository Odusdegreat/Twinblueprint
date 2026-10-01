import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { BackSide, PerspectiveCamera } from "three";
import panorama from "@/assets/tour-panorama.jpg";

const PanoramaSphere = () => {
  const texture = useTexture(panorama);
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 64, 64]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
};

const ResizeHandler = () => {
  const { gl, camera } = useThree();
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const canvas = gl.domElement;
    const parent = canvas.parentElement;
    if (!parent) return;

    const updateSize = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      if (camera instanceof PerspectiveCamera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      gl.setSize(width, height, false);
    };

    observerRef.current = new ResizeObserver(updateSize);
    observerRef.current.observe(parent);

    updateSize();

    return () => {
      observerRef.current?.disconnect();
    };
  }, [gl, camera]);

  return null;
};

const VirtualTourCanvas = () => (
  <Canvas
    camera={{ position: [0, 0, 0.1], fov: 75 }}
    gl={{ antialias: true, preserveDrawingBuffer: false }}
    dpr={[1, 2]}
    style={{ width: '100%', height: '100%', display: 'block' }}
  >
    <color attach="background" args={["#0f172a"]} />
    <ResizeHandler />
    <PanoramaSphere />
    <OrbitControls
      enableZoom={true}
      enablePan={false}
      rotateSpeed={-0.4}
      minDistance={0.1}
      maxDistance={5}
      zoomSpeed={0.6}
      autoRotate
      autoRotateSpeed={0.3}
    />
  </Canvas>
);

const LoadingFallback = () => (
  <div style={{ 
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: '#0f172a',
    color: '#64748b',
    fontSize: '14px'
  }}>
    Loading walkthrough...
  </div>
);

const VirtualTour = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VirtualTourCanvas />
    </Suspense>
  );
};

export default VirtualTour;