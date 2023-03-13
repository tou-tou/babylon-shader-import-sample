
uniform float time;

varying vec2 vUv;

float random(in vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.54523);
}

vec2 random2(vec2 p){
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main(){
    vec2 st=vUv;
    float size=20.;
    
    // voronoi
    st=st*size;
    vec2 ist=floor(st);
    vec2 fst=fract(st);
    
    float md=sqrt(2.);
    vec2 mp=vec2(.5,.5);
    float t=time;
    for(int k=-1;k<=1;k++){
        for(int j=-1;j<=1;j++){
            vec2 neighbor=vec2(k,j);
            vec2 m=neighbor+.5+.5*sin(t*.1+6.2831*random2(ist+neighbor));
            float d=length(m-fst);
            if(d<md)
            {
                // keep the closer distance
                md=d;
                // keep the position of the closer point
                mp=ist+m;
            }
        }
    }
    
    vec4 col=vec4(md,md,md,md)*10.;
    col.xy=mp*.1;
    col.xy+=(size-mp)*.02;
    // show isolines
    col-=abs(-sin(md*60.))*.5;
    // draw cell center
    col+=1.-step(.02,md);
    col.z=.4;
    
    gl_FragColor=col;
}

