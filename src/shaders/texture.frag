
uniform vec2 u_resolution;
uniform sampler2D textureSampler;

varying vec2 vUv;

void main(){
    vec4 texColor=texture2D(textureSampler,vUv);
    
    gl_FragColor=texColor;
}
