class Camera {
  constructor(gl, fov = 50, aspect = 1, near = 0.1, far = 100) {
    this.gl = gl;
    this.fov = fov;
    this.zoom = 1;
    this.near = near;
    this.far = far;
    this.aspect = aspect;
    this.projectionMatrix = mat4.create();
    this.viewMatrix = mat4.create();

    // Update projection matrix
    mat4.perspective(this.projectionMatrix, this.fov, this.aspect, this.near, this.far);
  }
}