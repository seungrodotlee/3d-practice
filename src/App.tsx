import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import {
  DirectionalLight,
  Fog,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { colors } from "./theme/colors";

function App() {
  const world = useRef<HTMLDivElement>(null);

  const [scene, setScene] = useState<Scene>();
  const [camera, setCamera] = useState<PerspectiveCamera>();
  const [renderer, setRenderer] = useState<WebGLRenderer>();

  const handleWindowResize = () => {
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;

    if (!camera || !renderer) return;

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  };

  const createScene = () => {
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;

    setScene(new Scene());

    if (!scene) return;

    scene.fog = new Fog(colors.Fog, 100, 950);

    const aspectRatio = WIDTH / HEIGHT;
    const fieldOfView = 60;
    const near = 1;
    const far = 10000;

    setCamera(new PerspectiveCamera(fieldOfView, aspectRatio, near, far));

    if (!camera) return;

    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;

    setRenderer(
      new WebGLRenderer({
        alpha: true,
        antialias: true,
      })
    );

    if (!renderer) return;

    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    window.addEventListener("resize", handleWindowResize, false);
  };

  const createLights = () => {
    const hemisphereLight = new HemisphereLight(0xaaaaaa, 0x000000, 9);
    const shadowLight = new DirectionalLight(0xffffff, 0.9);

    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;

    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    if (!scene) return;
    
    scene.add(hemisphereLight);
    scene.add(shadowLight);
  };

  useEffect(() => {
    createScene();
    createLights();
    // createPlane();
    // createSea();
    // createSky();
  }, []);

  return (
    <div className="App">
      <div
        ref={world}
        data-testid="world"
        className="world w-full h-full fixed top-0 left-0"
      ></div>
    </div>
  );
}

export default App;
