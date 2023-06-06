varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vModelPosition;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vNormal = normal;
    vModelPosition = vec3(modelPosition);
}