precision highp float;

// Attributes
layout(location=0)in vec3 position;// 頂点座標
layout(location=1)in vec2 uv;// UV座標
attribute vec3 normal;

// Varying
varying vec2 vUv;

// Uniforms
uniform mat4 worldViewProjection;

void main(){
    const float PI=3.14159265359;
    vUv=uv;
    
    vec4 p=vec4(position,1.);
    //
    
    // float t=time;
    // float amp=1.;
    // float freq=.8;
    // p.xyz+=normal*amp*sin(t*freq);
    
    gl_Position=worldViewProjection*p;
}