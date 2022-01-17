import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useLoader } from "@react-three/fiber";

export const ObjWithMtl = ({ name, mtlPath, objPath, ...props }) => {
  const materials = useLoader(MTLLoader, mtlPath);
  const object = useLoader(OBJLoader, objPath, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={object} {...props} />;
};

export const Obj = ({ name, objPath, ...props }) => {
  const object = useLoader(OBJLoader, objPath);
  return <primitive object={object} {...props} />;
};
