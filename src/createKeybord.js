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
    subscribe() {
      window.addEventListener("keydown", handleKeyDown, false);
      window.addEventListener("keyup", handleKeyUp, false);

      return this;
    },
    unsubscribe() {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);

      return this;
    },
    addKey(press, release, ...codeList) {
      console.log(codeList);
      codeList.forEach(code => {
        keys[code] = { 
          isDown: false,
          press, 
          release,
        };
      });

      return this;
    },
    removeKey(...codeList) {
      codeList.forEach(code => {
        delete keys[code];
      });

      return this;
    }
  }
}
