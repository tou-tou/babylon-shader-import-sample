import {
  ActionManager,
  Engine,
  ExecuteCodeAction,
  MeshBuilder,
  Scene,
  ShaderMaterial,
  Texture,
  Vector3,
  Vector4,
} from '@babylonjs/core';
import './style.scss';

import uvColorVS from './shaders/uvColor.vert?raw';
import uvColorFS from './shaders/uvColor.frag?raw';
import textureVS from './shaders/texture.vert?raw';
import textureFS from './shaders/texture.frag?raw';
import backgroundVS from './shaders/background.vert?raw';
import backgroundFS from './shaders/background.frag?raw';

const main = () => {
  const renderCanvas = document.getElementById(
    'renderCanvas'
  ) as HTMLCanvasElement;
  if (!renderCanvas) {
    return;
  }

  renderCanvas.width = window.innerWidth;
  renderCanvas.height = window.innerHeight;

  const engine = new Engine(renderCanvas, true);
  //const scene = new Scene(engine);

  const createScene = function () {
    const scene = new Scene(engine);
    //scene.clearColor = new Color3.Black;
    return scene;
  }

  const scene = createScene();
  scene.createDefaultCameraOrLight(true, true, true);


  // マテリアルの定義
  // uvColor
  const shaderMaterial = new ShaderMaterial(
    'uvColor',
    scene,
    {
      vertexSource: uvColorVS,
      fragmentSource: uvColorFS,
    },
    {
      attributes: ['position', 'normal', 'uv'],
      uniforms: ['worldViewProjection'],
    }
  );

  // texture
  const textureMaterial = new ShaderMaterial(
    'uvColor',
    scene,
    {
      vertexSource: textureVS,
      fragmentSource: textureFS,
    },
    {
      attributes: ['position', 'normal', 'uv'],
      uniforms: ['worldViewProjection', 'textureSampler'],
    }
  );

  //background
  const backgroundMaterial = new ShaderMaterial(
    'background',
    scene,
    {
      vertexSource: backgroundVS,
      fragmentSource: backgroundFS,
    },
    {
      attributes: ['position', 'normal', 'uv'],
      uniforms: ['worldViewProjection', 'textureSampler', 'time'],
    }
  );


  let time = 0;
  scene.registerBeforeRender(() => {
    shaderMaterial.setFloat('time', time);
    backgroundMaterial.setFloat('time', time);
    time += 0.03;
  });

  // ボックスの追加(uvColor)
  const uvColorBox = MeshBuilder.CreateBox('box', { size: 0.1 }, scene);
  shaderMaterial.cullBackFaces = false;
  shaderMaterial.backFaceCulling = false;
  uvColorBox.position = new Vector3(0, 0.1, 0);
  uvColorBox.material = shaderMaterial;

  // ボックスの追加（テクスチャ）
  //const texture = new Texture("https://assets.babylonjs.com/environments/bricktile.jpg", scene);
  const texture = new Texture("https://assets.babylonjs.com/environments/numbers.jpg", scene);
  textureMaterial.setTexture('textureSampler', texture);
  var columns = 6;
  var rows = 1;

  const faceUV = new Array(6);

  for (let i = 0; i < 6; i++) {
    faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
  }

  const options = { size: 0.1, faceUV: faceUV, wrap: true }
  const textureBox = MeshBuilder.CreateBox('box', options, scene);
  textureMaterial.setTexture('num', texture);
  textureBox.position = new Vector3(0, 0.3, 0);
  textureBox.material = textureMaterial;

  // 背景
  // Create and tweak the background material.
  var ground = MeshBuilder.CreateBox("ground", { size: 100 }, scene);
  backgroundMaterial.backFaceCulling = false;
  ground.material = backgroundMaterial;

  //操作の追加
  uvColorBox.actionManager = new ActionManager(scene);
  uvColorBox.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger,
    function (evt) {
      const sourceBox = evt.meshUnderPointer;
      //move the box upright
      if (sourceBox != null) {
        sourceBox.position.x += 0.1;
        sourceBox.position.y += 0.1;
      }

      //update the color
      //box.material.diffuseColor= new Color3.Random();

    }))

  engine.runRenderLoop(() => {
    scene.render();
  });
};

main();
