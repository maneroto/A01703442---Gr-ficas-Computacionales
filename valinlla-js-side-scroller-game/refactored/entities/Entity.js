export const entity = (() => {
  class Entity {
    constructor() {
      this.name = null;
      this.components = {};
      this.handlers = {};
      
      this.position = { x: 0, y: 0, }
      this.rotation = 0;

      this.parent = null;
      this.dead = false;
    }

    Destroy() {
      for (let item in this.components) {
        this.components[item].Destroy();
      }
      this.components = null;
      this.parent = null;
      this.handlers = null;
    }

    RegisterHandler(name, handler) {
      if (!(name in this.handlers)) {
        this.handlers[name] = [];
      }
      this.handlers.push(handler);
    }

    SetParent(parent) {
      this.parent = parent;
    }

    SetName(name) {
      this.name = name;
    }

    get Name() {
      return this.name;
    }

    get Manager() {
      return this.parent;
    }

    SetActive(b) {
      this.parent.SetActive(this, b);
    }

    SetDead() {
      this.dead = true;
    }

    AddComponent(component) {
      component.SetParent(this);
      this.components[component.constructor.name] = component;

      component.InitComponent();
    }

    InitEntity() {
      for (let item in this.components) {
        this.components[item].InitEntity();
      }
    }

    GetComponent(name) {
      return this.components[name];
    }

    FindEntity(name) {
      return this.parent.Get(name);
    }

    Broadcast(message) {
      if(!(message.topic in this.handlers))  return;

      for (let currentHandler of this.handlers[message.topic]) {
        currentHandler(message);
      }
    }

    SetPosition(position) {
      this.position = position;
      this.Broadcast({
        topic: 'update.position',
        value: this.position,
      });
    }

    SetRotation(rotation) {
      this.rotation = rotation;
      this.Broadcast({
        topic: 'update.rotation',
        value: this.rotation,
      });
    }

    get Position() {
      return this.position;
    }

    get Rotation() {
      return this.rotation;
    }

    Update(elapsedTime) {
      for (let item in this.components) {
        this.components[item].Update(elapsedTime);
      }
    }
  };

  class Component {
    constructor() {
      this.parent = null;
    }

    Destroy() {}

    SetParent(parent) {
      this.parent = parent;
    }

    InitComponent() {}

    InitEntity() {}

    GetComponent(name) {
      return this.parent.GetComponent(name);
    }

    get Manager() {
      return this.parent.Manager;
    }

    get Parent() {
      return this.parent;
    }

    FindEntity(name) {
      return this.parent.FindEntity(name);
    }

    Broadcast(message) {
      this.parent.Broadcast(message);
    }

    Update(_) {}

    RegisterHandler(name, handler) {
      this.parent.RegisterHandler(name, handler);
    }
  }

  return {
    Entity,
    Component,
  };
});