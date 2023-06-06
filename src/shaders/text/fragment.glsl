uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uAccentLightColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vModelPosition;

vec3 linearTosRGB(vec3 value ) {
  vec3 lt = vec3(lessThanEqual(value.rgb, vec3(0.0031308)));
  
  vec3 v1 = value * 12.92;
  vec3 v2 = pow(value.xyz, vec3(0.41666)) * 1.055 - vec3(0.055);

	return mix(v2, v1, lt);
}

void main()
{
    vec3 diffuse = mix(uColor1, uColor2, vModelPosition.y);

    // Diffuse lighting
    vec3 lightColor = uAccentLightColor;

    vec3 lightDirLeft = normalize(vec3(-1.0, 0.0, 0.0));
    float dpLeft = max(0.0, dot(lightDirLeft, vNormal));

    vec3 lightDirRight = normalize(vec3(1.0, 0.0, 0.0));
    float dpRight = max(0.0, dot(lightDirRight, vNormal));

    diffuse += dpLeft * lightColor;
    diffuse += dpRight * lightColor;

    gl_FragColor = vec4(diffuse, 1.0);
}