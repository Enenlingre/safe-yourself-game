export function createKeybord() {
  const keys = {};

  function checkPressedKey(code) {
    return Boolean(keys[code] && keys[code].isDown);
  }

  function handleKeyDown(e) {
    const key = keys[e.code];

    if (key && !key.isDown) {
      key.isDown = !key.isDown;
      key.press();
    }
  }

  function handleKeyUp(e) {
    const key = keys[e.code];

    if (key && key.isDown) {
      key.isDown = !key.isDown;
      key.release();
    }
  }

  return {
    subscrube() {
      window.addEventListener("keydown", handleKeyDown, false);
      window.addEventListener("keyup", handleKeyUp, false);
      
      return this;
    },
    unsubscribe() {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);

      return this;
    },
    addKey(code, press, release) {
      keys[code] = { 
        isDown: false,
        press, 
        release,
      };
      console.log(keys);
      return this;
    },
    removeKey(code) {
      delete keys[code];

      return this;
    }
  }
}
