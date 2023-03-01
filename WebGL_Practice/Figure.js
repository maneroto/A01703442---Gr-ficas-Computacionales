class Figure {
  constructor(vertices = [], indices = []) {
    this.vertices = vertices;
    this.indices = indices;
    this.vertexBuffer = [];
    this.colorsBuffer = [];

    this.createFaces();
  }

  addBufferedVertex(vertex) {
    this.vertexBuffer.push(vertex.x, vertex.y, vertex.z);
  }

  getVertex(index, vertex) {
    const offset = index * 3;
    
    vertex.x = this.vertices[offset + 0]
    vertex.y = this.vertices[offset + 1]
    vertex.z = this.vertices[offset + 2]
  }

  randomColor() {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();

    return [r, g, b, 1.0];
  }

  createFaces() {
    const a = vec3.create();
    const b = vec3.create();
    const c = vec3.create();

    for (let i = 0; i < this.indices.length; i += 3) {
      this.getVertex(this.indices[i + 0], a);
      this.getVertex(this.indices[i + 1], b);
      this.getVertex(this.indices[i + 2], c);

      this.addBufferedVertex(a);
      this.addBufferedVertex(b);
      this.addBufferedVertex(c);
    }
  }
}

export { Figure };