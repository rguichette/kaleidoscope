// #ifdef GL_ES
precision highp float;
// #endif

#define SEGMENTS 32.
#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D image;

uniform sampler2D prevFrame;
uniform sampler2D prevPass;

varying vec2 v_textcoord;

void main(void)
{
    vec2 uv=-1.+2.*v_textcoord;
    uv*=4.;
    //    uv -= .1;
    
    //make mouse
    vec2 mouse=u_mouse/u_resolution;
    
    // get the angle and radius
    float radius=length(uv);
    float angle=atan(uv.y,uv.x);
    
    angle/=PI*2.;
    
    angle*=SEGMENTS;
    
    //repeat segment
    if(mod(angle,2.)>=1.){
        angle=fract(angle);
        
    }else{
        angle=1.-fract(angle);
        
    }
    
    angle+=u_time;
    
    //    angle /= SEGMENTS;
    //    angle *= PI *2.0;
    
    vec2 point=vec2(radius*cos(angle),
    radius*sin(angle));
    
    point=fract(point);
    
    vec4 color=texture2D(image,point);
    
    gl_FragColor=color;
}