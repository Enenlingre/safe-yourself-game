export function createKeybord() {
  const keys = {};

  function downHandler(e) {
    if (keys[e.code]) keys[e.code].press();
  }

  function upHandler(e) {
    if (keys[e.code]) keys[e.code].release();
  }

  return {
    subscrube() {
      window.addEventListener("keydown", downHandler, false);
      window.addEventListener("keyup", upHandler, false);
      
      return this;
    },
    unsubscribe() {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);

      return this;
    },
    addKey(code, press, release) {
      keys[code] = { press, release };
      console.log(keys);
      return this;
    },
    removeKey(code) {
      delete keys[code];

      return this;
    }
  }
}
