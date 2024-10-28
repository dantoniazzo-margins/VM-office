import { useEffect, useState } from "react";
import { Group, Object3DEventMap } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
// Custom hook for loading FBX models
export const useFBX = (path: string) => {
  const [model, setModel] = useState<Group<Object3DEventMap> | null>(null);
  const [animations, setAnimations] = useState({});
  const [mixer, setMixer] = useState<THREE.AnimationMixer | null>(null);
  const loader = new FBXLoader();

  useEffect(() => {
    loader.load(path, (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse((c) => {
        c.castShadow = true;
      });
      setModel(fbx);
      const newMixer = new THREE.AnimationMixer(fbx);
      setMixer(newMixer);
    });
  }, [path]);

  const loadAnimation = (name: string, url: string) => {
    loader.load(url, (anim) => {
      const clip = anim.animations[0];
      const action = mixer?.clipAction(clip);
      setAnimations((prev) => ({
        ...prev,
        [name]: { clip, action },
      }));
    });
  };

  return { model, animations, mixer, loadAnimation };
};
