in vec2 texCoordV;
uniform vec2 u_resolution;

varying vec2 vUv;

void main(){
    vec2 st=vUv;
    vec3 color=vec3(0.);
    
    st*=5.;// Scale up the space by 5
    st=fract(st);// Wrap around 1.0
    
    color=vec3(st.x,st.y,st.y);
    
    gl_FragColor=vec4(color,1.);
}
