class Renderer {
  constructor(canvasId) {
    this.canvas = document.querySelector(canvasId);
    this.canvas.style.display = 'block';
    this.gl = this.canvas.getContext('webgl');
    if (!this.gl) throw new Error('Unable to initialize WebGL, your machine might not support it.');
    
    this.setSize(window.innerWidth, window.innerHeight);
    this.gl.clearColor(255,255,255, 1);
    this.clear();
  }

  setSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    })
  }

  clear(color = true, depth = true, stencil = true ) {

		let bits = 0;

		if ( color ) bits |= this.gl.COLOR_BUFFER_BIT;
		if ( depth ) bits |= this.gl.DEPTH_BUFFER_BIT;
		if ( stencil ) bits |= this.gl.STENCIL_BUFFER_BIT;

		this.gl.clear( bits );

	};

  clearColor() {
    this.clear(true, false, false);
  }

  clearDepth() {
    this.clear(false, true, false);
  }

  clearStencil() {
    this.clear(false, false, true);
  }
}

export { Renderer };