// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/components/functions/canvas.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 *
 *
 */
let makeCanvas = () => document.createElement('canvas');

var _default = makeCanvas;
exports.default = _default;
},{}],"src/components/classes/math/vector.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector = void 0;

/**
 * @class Vector
 * @param x - Contains the x Value for the vector
 * @param y - Contains the y Value for the Vector
 * @method add - Adds Two Vectors Together X+X Y+Y
 * @method mult - Multiplies Either Two Vecors (X * X , Y * Y) or by a scala (X * S , Y * S)
 * @method div - The inverse of Mult Divides Either by a Vector or a Scala!
 * @method limit -Forces the Magnatude of the vector to a specified number if it is greater
 */
class Vector {
  constructor(x = 0, y = 0) {
    this.x = x || 0;
    this.y = y || 0;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
  }

  addX(v) {
    this.x += v.x;
  }

  addY(v) {
    this.y += v.y;
  }

  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  subtractX(v) {
    this.x -= v.x;
  }

  subtractY(v) {
    this.y -= v.y;
  }

  mult(factor) {
    if (factor instanceof Vector) {
      this.x *= factor.x;
      this.y *= factor.y;
    } else {
      this.x *= factor;
      this.y *= factor;
    }
  }

  div(divisor) {
    if (divisor instanceof Vector) {
      this.x /= divisor.x;
      this.y /= divisor.y;
    } else {
      this.x /= divisor;
      this.y /= divisor;
    }
  }

  distanceX(v) {
    return this.x - v.x;
  }

  distanceY(v) {
    return this.y - v.y;
  }

  distance(v) {
    return Math.sqrt(this.distanceSq(v));
  }

  distanceSq(v) {
    let dx = this.distanceX(v);
    let dy = this.distanceY(v);
    return dx * dx + dy * dy;
  }

  limit(max) {
    let mSq = this.x * this.x + this.y * this.y;

    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)); //normalize it

      this.mult(max);
    }

    return this;
  }

  same(Other) {
    if (Other.x === this.x && Other.y === this.y) {
      return true;
    } else {
      return false;
    }
  }

}

exports.Vector = Vector;
},{}],"src/components/classes/systems/sound.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 *
 *
 * @param {string} src
 * @this sound
 */
class sound {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute('loop', true);
    this.sound.style.display = "none";
  }

  addSound() {
    document.body.appendChild(this.sound);
  }

  play() {
    this.sound.play();
  }

  stop() {
    this.sound.load();
    this.sound.pause();
  }

}

exports.default = sound;
},{}],"src/components/classes/dungeons/dungeons.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vector = require("../math/vector");

var _sound = _interopRequireDefault(require("../systems/sound"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 * @export
 * @class Dungeon
 */
class Dungeon {
  constructor(name, equipment) {
    this.name = name;
    this.position = new _vector.Vector();
    this.url = "";
    this.keys = [];
    this.miniboss = false;
    this.item = false;
    this.lockedDoors = [];
    this.rooms = [];
    this.visitedRooms = [];
    this.boss = false;
    this.treasures = equipment;
    this.theme = new _sound.default('../music/Labyrinth.mp3');
  }

}

exports.default = Dungeon;
},{"../math/vector":"src/components/classes/math/vector.ts","../systems/sound":"src/components/classes/systems/sound.ts"}],"src/components/classes/dungeons/dungeonOne.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dungeons = _interopRequireDefault(require("./dungeons"));

var _vector = require("../math/vector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class firstDungeon extends _dungeons.default {
  constructor() {
    super('firstDungeon', ["map", "compas", "bow", "boomerang", "heartContainer", "shardOne"]);
    this.position = new _vector.Vector(2, 5);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon1.png";
  }

  goToOverworld(position, gameState) {
    let exit = [2, 5, 7.5, 9];
    const [x, y, px, py] = exit;

    if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
      gameState.Map = 0;
      this.theme.stop();
      gameState.currentMap.theme.play();
      position.x = 7;
      position.y = 5;
    }
  }

}

exports.default = firstDungeon;
},{"./dungeons":"src/components/classes/dungeons/dungeons.ts","../math/vector":"src/components/classes/math/vector.ts"}],"src/components/classes/dungeons/dungeonTwo.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dungeons = _interopRequireDefault(require("./dungeons"));

var _vector = require("../math/vector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class secondDungeon extends _dungeons.default {
  constructor() {
    super('secondDungeon', ["map", "compas", "magicalBoomerang", "heartContainer", "shardTwo"]);
    this.position = new _vector.Vector(1, 7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon2.png";
  }

  goToOverworld(position, gameState) {
    let exit = [1, 7, 7.5, 9];
    const [x, y, px, py] = exit;

    if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
      gameState.Map = 0;
      this.theme.stop();
      gameState.currentMap.theme.play();
      position.x = 7;
      position.y = 5;
    }
  }

}

exports.default = secondDungeon;
},{"./dungeons":"src/components/classes/dungeons/dungeons.ts","../math/vector":"src/components/classes/math/vector.ts"}],"src/components/classes/dungeons/dungeonThree.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dungeons = _interopRequireDefault(require("./dungeons"));

var _vector = require("../math/vector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class thirdDungeon extends _dungeons.default {
  constructor() {
    super('thirdDungeon', ["map", "compas", "raft", "heartContainer", "shardThree"]);
    this.position = new _vector.Vector(3, 5);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon3.png";
  }

  goToOverworld(position, gameState) {
    let exit = [3, 5, 7.5, 9];
    const [x, y, px, py] = exit;

    if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
      gameState.Map = 0;
      this.theme.stop();
      gameState.currentMap.theme.play();
      position.x = 8;
      position.y = 5;
    }
  }

}

exports.default = thirdDungeon;
},{"./dungeons":"src/components/classes/dungeons/dungeons.ts","../math/vector":"src/components/classes/math/vector.ts"}],"src/components/classes/dungeons/dungeonFour.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dungeons = _interopRequireDefault(require("./dungeons"));

var _vector = require("../math/vector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class fourthDungeon extends _dungeons.default {
  constructor() {
    super('fourthDungeon', ["map", "compas", "stepLadder", "heartContainer", "shardFour"]);
    this.position = new _vector.Vector(1, 7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon4.png";
  }

  goToOverworld(position, gameState) {
    let exit = [1, 7, 7.5, 9];
    const [x, y, px, py] = exit;

    if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
      gameState.Map = 0;
      this.theme.stop();
      gameState.currentMap.theme.play();
      position.x = 8;
      position.y = 5;
    }
  }

}

exports.default = fourthDungeon;
},{"./dungeons":"src/components/classes/dungeons/dungeons.ts","../math/vector":"src/components/classes/math/vector.ts"}],"src/components/classes/dungeons/dungeonFive.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dungeons = _interopRequireDefault(require("./dungeons"));

var _vector = require("../math/vector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class fifthDungeon extends _dungeons.default {
  constructor() {
    super('FifthDungeon', ["map", "compas", "recorder", "heartContainer", "shardFive"]);
    this.position = new _vector.Vector(2, 7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon5.png";
  }

  goToOverworld(position, gameState) {
    let exit = [2, 7, 7.5, 9];
    const [x, y, px, py] = exit;

    if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
      gameState.Map = 0;
      this.theme.stop();
      gameState.currentMap.theme.play();
      position.x = 7;
      position.y = 5;
    }
  }

}

exports.default = fifthDungeon;
},{"./dungeons":"src/components/classes/dungeons/dungeons.ts","../math/vector":"src/components/classes/math/vector.ts"}],"src/components/classes/dungeons/dungeonSix.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dungeons = _interopRequireDefault(require("./dungeons"));

var _vector = require("../math/vector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class sixthDungeon extends _dungeons.default {
  constructor() {
    super('sixthDungeon', ["map", "compas", "magicRod", "heartContainer", "shardSix"]);
    this.position = new _vector.Vector(1, 7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon6.png";
  }

  goToOverworld(position, gameState) {
    let exit = [1, 7, 7.5, 9];
    const [x, y, px, py] = exit;

    if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
      gameState.Map = 0;
      this.theme.stop();
      gameState.currentMap.theme.play();
      position.x = 7;
      position.y = 5;
    }
  }

}

exports.default = sixthDungeon;
},{"./dungeons":"src/components/classes/dungeons/dungeons.ts","../math/vector":"src/components/classes/math/vector.ts"}],"src/components/classes/dungeons/dungeonSeven.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dungeons = _interopRequireDefault(require("./dungeons"));

var _vector = require("../math/vector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class seventhDungeon extends _dungeons.default {
  constructor() {
    super('seventhDungeon', ["map", "compas", "redCandle", "heartContainer", "shardSeven"]);
    this.position = new _vector.Vector(1, 7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon7.png";
  }

  goToOverworld(position, gameState) {
    let exit = [1, 7, 7.5, 9];
    const [x, y, px, py] = exit;

    if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
      gameState.Map = 0;
      this.theme.stop();
      gameState.currentMap.theme.play();
      position.x = 7;
      position.y = 5;
    }
  }

}

exports.default = seventhDungeon;
},{"./dungeons":"src/components/classes/dungeons/dungeons.ts","../math/vector":"src/components/classes/math/vector.ts"}],"src/components/classes/dungeons/dungeonEight.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dungeons = _interopRequireDefault(require("./dungeons"));

var _vector = require("../math/vector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class eighthDungeon extends _dungeons.default {
  constructor() {
    super('eighthDungeon', ["map", "compas", "bookOfMagic", " magicalKey", "heartContainer", "shardEight"]);
    this.position = new _vector.Vector(3, 7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon8.png";
  }

  goToOverworld(position, gameState) {
    let exit = [3, 7, 7.5, 9];
    const [x, y, px, py] = exit;

    if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
      gameState.Map = 0;
      this.theme.stop();
      gameState.currentMap.theme.play();
      position.x = 9;
      position.y = 2;
    }
  }

}

exports.default = eighthDungeon;
},{"./dungeons":"src/components/classes/dungeons/dungeons.ts","../math/vector":"src/components/classes/math/vector.ts"}],"src/components/classes/dungeons/dungeonNine.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dungeons = _interopRequireDefault(require("./dungeons"));

var _vector = require("../math/vector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ninthDungeon extends _dungeons.default {
  constructor() {
    super('ninthDungeon', ["map", "compas", "silverArrows", "redRing", "heartContainer", "shardNine"]);
    this.position = new _vector.Vector(6, 7);
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/dungeons/zelda-dungeon9.png";
  }

  goToOverworld(position, gameState) {
    let exit = [6, 7, 7.5, 9];
    const [x, y, px, py] = exit;

    if (this.position.x === x && this.position.y === y && position.x >= px && position.y >= py) {
      gameState.Map = 0;
      this.theme.stop();
      gameState.currentMap.theme.play();
      position.x = 5;
      position.y = 7;
    }
  }

}

exports.default = ninthDungeon;
},{"./dungeons":"src/components/classes/dungeons/dungeons.ts","../math/vector":"src/components/classes/math/vector.ts"}],"src/components/classes/systems/inventory.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 *
 *
 * @export
 * @class inventory
 */
class inventory {
  /**
   *Creates an instance of inventory.
   * @memberof inventory
   */
  constructor() {
    this.rupees = 0;
    this.items = [];
    this.subWeapon = '';
    this.b = [];
    this.a = [];
    this.triforceParts = [];
    this.keys = 0;
    this.bombs = 0;
    this.bomb = false;
    this.arrow = false;
  }

}

exports.default = inventory;
},{}],"src/components/overworld.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vector = require("./classes/math/vector");

var _sound = _interopRequireDefault(require("./classes/systems/sound"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Overworld {
  constructor() {
    this.position = new _vector.Vector(0, 0);
    this.theme = new _sound.default('../music/Overworld.mp3');
    this.url = "https://raw.githubusercontent.com/miaklwalker/thelegendofzelda/master/images/overworld/zelda-overworld.png";
  }

}

exports.default = Overworld;
},{"./classes/math/vector":"src/components/classes/math/vector.ts","./classes/systems/sound":"src/components/classes/systems/sound.ts"}],"src/components/classes/systems/gameState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dungeonOne = _interopRequireDefault(require("../dungeons/dungeonOne"));

var _dungeonTwo = _interopRequireDefault(require("../dungeons/dungeonTwo"));

var _dungeonThree = _interopRequireDefault(require("../dungeons/dungeonThree"));

var _dungeonFour = _interopRequireDefault(require("../dungeons/dungeonFour"));

var _dungeonFive = _interopRequireDefault(require("../dungeons/dungeonFive"));

var _dungeonSix = _interopRequireDefault(require("../dungeons/dungeonSix"));

var _dungeonSeven = _interopRequireDefault(require("../dungeons/dungeonSeven"));

var _dungeonEight = _interopRequireDefault(require("../dungeons/dungeonEight"));

var _dungeonNine = _interopRequireDefault(require("../dungeons/dungeonNine"));

var _inventory = _interopRequireDefault(require("./inventory"));

var _overworld = _interopRequireDefault(require("../../overworld"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let index = 0;
/**
 *
 *
 * @export
 * @class gameState
 */

class gameState {
  /**
   *Creates an instance of gameState.
   * @memberof gameState
   */
  constructor() {
    this.maps = [new _overworld.default(), new _dungeonOne.default(), new _dungeonTwo.default(), new _dungeonThree.default(), new _dungeonFour.default(), new _dungeonFive.default(), new _dungeonSix.default(), new _dungeonSeven.default(), new _dungeonEight.default(), new _dungeonNine.default()];
    this.inventory = new _inventory.default();
    this.paused = false;
    this.transition = false;
    this.currentMap = this.maps[0];
  }

  set Map(num) {
    if (num < 0 || num > 9) {
      throw new Error('Dungeon not found');
    } else {
      this.currentMap = this.maps[num];
    }
  }

  changeScreen(position, game) {
    let map = this.currentMap.position;
    let changed = false;

    if (position.x > 15) {
      position.x = 1;
      map.x += 1;
      changed = true;
    }

    if (position.x < 0.7) {
      position.x = 14;
      map.x -= 1;
      changed = true;
    }

    if (position.y > 9.7) {
      position.y = 1;
      map.y += 1;
      changed = true;
    }

    if (position.y < 0.7) {
      position.y = 9;
      map.y -= 1;
      changed = true;
    }

    if (changed) {
      let index = `${map.x},${map.y}`;
      console.log(index);
      game.system.makeScreen(game.json.tileMap[index]);
      changed = false;
    }
  }

  changeMap(position) {
    if (this.currentMap !== this.maps[0]) {
      //@ts-ignore
      this.currentMap.goToOverworld(position, this);
    } else {
      let dunLoc = [[7, 3, 7, 4], [12, 3, 7, 4], [4, 7, 8, 4], [5, 4, 8, 4], [11, 0, 7, 4], [2, 4, 7, 4], [2, 2, 7, 4], [13, 6, 10, 2], [5, 0, 5, 6]];
      dunLoc.forEach(([oX, oY, lX, lY], index) => {
        if (oX === this.currentMap.position.x && oY === this.currentMap.position.y && lX === Math.round(position.x) && lY === Math.round(position.y)) {
          this.currentMap.theme.stop();
          this.currentMap = this.maps[index + 1];
          this.currentMap.theme.play();
          position.x = 7.6;
          position.y = 7.7;
        }
      });
    }
  }

  onMessage(msg) {
    if (msg.from === 'controls') {
      //@ts-ignore
      this[msg.type] = !this[msg.type];
    }
  }

}

exports.default = gameState;
},{"../dungeons/dungeonOne":"src/components/classes/dungeons/dungeonOne.ts","../dungeons/dungeonTwo":"src/components/classes/dungeons/dungeonTwo.ts","../dungeons/dungeonThree":"src/components/classes/dungeons/dungeonThree.ts","../dungeons/dungeonFour":"src/components/classes/dungeons/dungeonFour.ts","../dungeons/dungeonFive":"src/components/classes/dungeons/dungeonFive.ts","../dungeons/dungeonSix":"src/components/classes/dungeons/dungeonSix.ts","../dungeons/dungeonSeven":"src/components/classes/dungeons/dungeonSeven.ts","../dungeons/dungeonEight":"src/components/classes/dungeons/dungeonEight.ts","../dungeons/dungeonNine":"src/components/classes/dungeons/dungeonNine.ts","./inventory":"src/components/classes/systems/inventory.ts","../../overworld":"src/components/overworld.ts"}],"src/components/classes/actors/link.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vector = require("../math/vector");

/**
 *
 *
 * @export
 * @class Link
 * @description Will encapsulate Link , including health , position
 */
class Link {
  constructor() {
    this.frameAdjusted = 0;
    this.hearts = 3;
    this.health = 3;
    this.position = new _vector.Vector(7, 5);
    this.action = 'walk';
    this.shield = 'small';
    this.direction = 'right';
  }

  show() {
    let str = `link-${this.action}-${this.direction}-${this.frameAdjusted % 2 + 1}-${this.shield}`;
    return str;
  }

  onMessage(msg) {
    //@ts-ignore
    this[msg.type] = msg.data;

    if (msg.data === "right") {
      this.position.x += .2;
    }

    if (msg.data === "down") {
      this.position.y += .2;
    }

    if (msg.data === "left") {
      this.position.x -= .2;
    }

    if (msg.data === "up") {
      this.position.y -= .2;
    }

    this.frameAdjusted++;
  }

}

exports.default = Link;
},{"../math/vector":"src/components/classes/math/vector.ts"}],"src/components/functions/getImage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadImage;

/**
 *
 *
 * @export
 * @param {string} url
 * @returns
 */
function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}
},{}],"src/components/classes/systems/camera.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vector = require("../math/vector");

var _getImage = _interopRequireDefault(require("../../functions/getImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class camera {
  constructor() {
    this.position = new _vector.Vector();
  }

  show(game, context) {
    let paused = game.gameState.paused ? 480 : 120;
    let {
      x,
      y
    } = this.position;
    let {
      url,
      position
    } = game.gameState.currentMap;
    (0, _getImage.default)(url).then(data => {
      this.position = position;
      context.drawImage(data, x * 256, y * 176.1, 256, 405, 0, paused, 512, 863);
    });
  }

}

exports.default = camera;
},{"../math/vector":"src/components/classes/math/vector.ts","../../functions/getImage":"src/components/functions/getImage.ts"}],"src/components/classes/systems/hud.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vector = require("../math/vector");

/**
 *
 *
 * @export
 * @class Hud
 */
class Hud {
  /**
   *Creates an instance of Hud.
   * @param {Game} game
   * @memberof Hud
   */
  constructor(game) {
    this.rupees = game.gameState.inventory.rupees;
    this.keys = game.gameState.inventory.keys;
    this.bombs = game.gameState.inventory.bombs;
    this.hearts = game.Link.hearts;
    this.position = new _vector.Vector();
    this.frame = 0;
    this.blink = false;
    this.camera = game.camera;
  }

  minimap(context) {
    this.position = this.camera.position;
    this.frame++;

    if (this.frame % 30 === 0) {
      this.blink = !this.blink;
    }

    let minimapX = 130;
    let minimapY = 77;
    let width = 16;
    let height = 8;
    let offsetX = 31;
    let offsetY = 385;
    let color = this.blink ? 0 : 1;
    let colors = ["lightGrey", "Grey"];
    let x = minimapX / width * this.position.x + offsetX;
    let y = minimapY / height * this.position.y + offsetY;
    context.fillStyle = colors[1];
    context.fillRect(offsetX, offsetY, minimapX, minimapY);
    context.fillStyle = "black";
    context.fillRect(31, 366, 130, 19);
    context.fillStyle = colors[color];
    context.fillRect(x, y, 9, 9);
    this.showHearts(context);
  }
  /**
   *
   *
   * @param {CanvasRenderingContext2D} context
   * @param {Game} game
   * @memberof Hud
   */


  show(context, game) {}

  showHearts(context) {
    let index = 0;
    let heartNum = this.hearts;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 8; j++) {
        index++;
        heartNum >= index ? context.fillStyle = 'red' : context.fillStyle = "black";
        context.fillRect(352 + j * 16.125, 442.9 - 19.5 * i, 16.125, 19.5);
      }
    }
  }

}

exports.default = Hud;
},{"../math/vector":"src/components/classes/math/vector.ts"}],"src/components/objects/decorators.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.bind = exports.debounce = exports.memoize = void 0;
//@ts-ignore
const EMPTY = {};
const HOP = Object.prototype.hasOwnProperty;
let fns = {
  /**  let cachedFn = memoize(originalFn); */
  //@ts-ignore
  memoize(fn, opt = EMPTY) {
    //@ts-ignore
    let cache = opt.cache || {}; //@ts-ignore

    return function (...a) {
      //@ts-ignore
      let k = String(a[0]); //@ts-ignore

      if (opt.caseSensitive === false) k = k.toLowerCase(); //@ts-ignore

      return HOP.call(cache, k) ? cache[k] : cache[k] = fn.apply(this, a);
    };
  },

  /** let throttled = debounce(10, console.log); */
  //@ts-ignore
  debounce(fn, opts) {
    if (typeof opts === 'function') {
      let p = fn;
      fn = opts;
      opts = p;
    }

    let delay = opts && opts.delay || opts || 0,
        //@ts-ignore
    args,
        context,
        timer; //@ts-ignore

    return function (...a) {
      args = a; //@ts-ignore

      context = this; //@ts-ignore

      if (!timer) timer = setTimeout(() => {
        //@ts-ignore
        fn.apply(context, args);
        args = context = timer = null;
      }, delay);
    };
  },

  //@ts-ignore
  bind(target, key, {
    value: fn
  }) {
    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false;
    return {
      configurable: true,

      get() {
        if (definingProperty) {
          return fn;
        }

        let value = fn.bind(this);
        definingProperty = true;
        Object.defineProperty(this, key, {
          value,
          configurable: true,
          writable: true
        });
        definingProperty = false;
        return value;
      }

    };
  }

}; //@ts-ignore

let memoize = multiMethod(fns.memoize),
    //@ts-ignore
debounce = multiMethod(fns.debounce),
    //@ts-ignore
bind = multiMethod((f, c) => f.bind(c), () => fns.bind);
exports.bind = bind;
exports.debounce = debounce;
exports.memoize = memoize;
var _default = {
  memoize,
  debounce,
  bind
};
/** Creates a function that supports the following calling styles:
 *	d() - returns an unconfigured decorator
 *	d(opts) - returns a configured decorator
 *	d(fn, opts) - returns a decorated proxy to `fn`
 *	d(target, key, desc) - the decorator itself
 *
 *	@Example:
 *		// simple identity deco:
 *		let d = multiMethod( fn => fn );
 *
 *		class Foo {
 *			@d
 *			bar() { }
 *
 *			@d()
 *			baz() { }
 *
 *			@d({ opts })
 *			bat() { }
 *
 *			bap = d(() => {})
 *		}
 */
//@ts-ignore

exports.default = _default;

function multiMethod(inner, deco) {
  deco = deco || inner.decorate || decorator(inner);
  let d = deco(); //@ts-ignore

  return (...args) => {
    let l = args.length;
    return (l < 2 ? deco : l > 2 ? d : inner)(...args);
  };
}
/** Returns function supports the forms:
 *	deco(target, key, desc) -> decorate a method
 *	deco(Fn) -> call the decorator proxy on a function
 */
//@ts-ignore


function decorator(fn) {
  //@ts-ignore
  return opt => //@ts-ignore
  typeof opt === 'function' ? fn(opt) : (target, key, desc) => {
    desc.value = fn(desc.value, opt, target, key, desc);
  };
}
},{}],"src/components/classes/systems/pauseScreen.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hud = _interopRequireDefault(require("./hud"));

var _decorators = require("../../objects/decorators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 *
 *
 * @export
 * @class pauseScreen
 */
class pauseScreen {
  /**
   *Creates an instance of pauseScreen.
   * @memberof pauseScreen
   */
  constructor(game) {
    this.frame = 0;
    this.blink = true;
    this.hud = new _hud.default(game);
  }
  /**
   * @param {Game} game
   * @returns
   * @memberof pauseScreen
   */


  show(game) {
    let screen = () => {
      let canvas = document.createElement("canvas");
      canvas.width = game.width;
      canvas.height = game.height;
      let context = canvas.getContext("2d");
      let imageOne = game.images[11].sheet;
      const HUD = imageOne;
      context.drawImage(HUD, ...game.json.hud.inventory); //*inventory

      context.drawImage(HUD, ...game.json.hud.triforce); //*triforce

      context.drawImage(HUD, ...game.json.hud.top); //*hud

      this.hud.minimap(context);
      return canvas;
    };

    return screen;
  }

}

exports.default = pauseScreen;

__decorate([_decorators.memoize], pauseScreen.prototype, "show", null);
},{"./hud":"src/components/classes/systems/hud.ts","../../objects/decorators":"src/components/objects/decorators.ts"}],"src/components/classes/systems/SpriteSheet.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 *
 *
 * @export
 * @class SpriteSheet
 */
class SpriteSheet {
  constructor(image, name) {
    this.sheet = image;
    this.name = name;
    this.sprites = {};
  }
  /**
   *
   *
   * @param {RootObject} json
   * @memberof SpriteSheet
   * @description takes a string " 'name''direction'-'number(as word)'-'action'-'shieldSize'  "
   * and uses it as the key for an array of values
   */


  makeSprites(json) {
    //@ts-ignore
    json.Sprites[this.name].forEach(Sprite => {
      if (this.name === "link") {
        //@ts-ignore
        this.sprites[Sprite.name] = [Sprite.x, Sprite.y, Sprite.w, Sprite.h];
      }
    });
  }

  renderSprite(context, action, location) {
    //@ts-ignores
    context.drawImage(this.sheet, ...this.sprites[action], ...location);
  }

}

exports.default = SpriteSheet;
},{}],"src/components/classes/systems/message.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 *
 *
 * @export
 * @class Message
 */
class Message {
  /**
   *Creates an instance of Message.
   * @param {string} to
   * @param {string} from
   * @param {string} type
   * @param {*} data
   * @memberof Message
   */
  constructor(to, from, type, data) {
    this.to = to;
    this.from = from;
    this.type = type;
    this.data = data;
  }

}

exports.default = Message;
},{}],"src/components/classes/systems/controls.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _message = _interopRequireDefault(require("./message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Controls {
  constructor(config) {
    this.up = config.up;
    this.down = config.down;
    this.left = config.left;
    this.right = config.right;
    this.start = config.start;
    this.select = config.select;
    this.A = config.A;
    this.B = config.B;
    this.lastKey = "";
    this.keyUp = "";
    this.timeOut = 0;
  }

  setupControls(msgCenter) {
    const values = Object.values(this);
    const keys = Object.keys(this);
    document.addEventListener("keydown", event => {
      for (let i = 0; i < keys.length; i++) {
        if (event.code === values[i] && this.lastKey !== keys[i]) {
          if (["up", "down", "left", "right", "A", "B"].includes(keys[i])) {
            event.preventDefault();
            this.lastKey = keys[i];
            let msg = new _message.default("Link", "controls", "direction", keys[i]);
            msgCenter.add(msg);
          } else {
            this.lastKey = keys[i];
            let msg = new _message.default("gameState", "controls", "paused", keys[i]);
            msgCenter.add(msg);
          }
        }
      }
    });
    document.addEventListener("keyup", event => {
      for (let i = 0; i < keys.length; i++) {
        if (event.code === values[i] && this.keyUp !== keys[i]) {
          this.keyUp = keys[i];
        }
      }
    });
    setTimeout(() => {
      this.lastKey = "";
    }, 150);
  }

}

exports.default = Controls;
},{"./message":"src/components/classes/systems/message.ts"}],"src/components/classes/systems/messageQueue.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 *
 *
 * @export
 * @class MessageQueue
 */
class MessageQueue {
  /**
   *Creates an instance of MessageQueue.
   * @memberof MessageQueue
   */
  constructor(game) {
    this.messages = [];
    this.entities = [];
    this.game = game;
  }
  /**
   *
   *
   * @param {Message} msg
   * @memberof MessageQueue
   */


  add(msg) {
    this.messages.push(msg);
  }
  /**
   *
   *
   * @memberof MessageQueue
   */


  addEntities() {}
  /**
   *
   *
   * @memberof MessageQueue
   */


  dispatch() {
    for (let i = 0; i < this.messages.length; i++) {
      let msg = this.messages[i]; //@ts-ignore

      this.game[msg.to].onMessage(msg);
      this.messages.splice(i, 1);
    }
  }

  purge() {
    this.entities = [];
  }

}

exports.default = MessageQueue;
},{}],"src/components/classes/systems/controlsConfig.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class controlsConfig {
  constructor(up, down, left, right, start, select, A, B) {
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.start = start;
    this.select = select;
    this.A = A;
    this.B = B;
  }

}

exports.default = controlsConfig;
},{}],"src/components/objects/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _controlsConfig = _interopRequireDefault(require("../classes/systems/controlsConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = new _controlsConfig.default('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space', 'KeyA', 'KeyB');
var _default = config;
exports.default = _default;
},{"../classes/systems/controlsConfig":"src/components/classes/systems/controlsConfig.ts"}],"src/components/Collisions/modules/BVHBranch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @private
 */
const branch_pool = [];
/**
 * A branch within a BVH
 * @class
 * @private
 */

class BVHBranch {
  /**
   * @constructor
   */
  constructor() {
    /** @private */
    this._bvh_parent = null;
    /** @private */

    this._bvh_branch = true;
    /** @private */

    this._bvh_left = null;
    /** @private */

    this._bvh_right = null;
    /** @private */

    this._bvh_sort = 0;
    /** @private */

    this._bvh_min_x = 0;
    /** @private */

    this._bvh_min_y = 0;
    /** @private */

    this._bvh_max_x = 0;
    /** @private */

    this._bvh_max_y = 0;
  }
  /**
   * Returns a branch from the branch pool or creates a new branch
   * @returns {BVHBranch}
   */


  static getBranch() {
    if (branch_pool.length) {
      return branch_pool.pop();
    }

    return new BVHBranch();
  }
  /**
   * Releases a branch back into the branch pool
   * @param {BVHBranch} branch The branch to release
   */


  static releaseBranch(branch) {
    branch_pool.push(branch);
  }
  /**
   * Sorting callback used to sort branches by deepest first
   * @param {BVHBranch} a The first branch
   * @param {BVHBranch} b The second branch
   * @returns {Number}
   */


  static sortBranches(a, b) {
    return a.sort > b.sort ? -1 : 1;
  }

}

exports.default = BVHBranch;
;
},{}],"src/components/Collisions/modules/BVH.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BVHBranch = _interopRequireDefault(require("./BVHBranch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Bounding Volume Hierarchy (BVH) used to find potential collisions quickly
 * @class
 * @private
 */
class BVH {
  /**
   * @constructor
   */
  constructor() {
    /** @private */
    this._hierarchy = null;
    /** @private */

    this._bodies = [];
    /** @private */

    this._dirty_branches = [];
  }
  /**
   * Inserts a body into the BVH
   * @param {Circle|Polygon|Point} body The body to insert
   * @param {Boolean} [updating = false] Set to true if the body already exists in the BVH (used internally when updating the body's position)
   */


  insert(body, updating = false) {
    if (!updating) {
      const bvh = body._bvh;

      if (bvh && bvh !== this) {
        throw new Error('Body belongs to another collision system');
      }

      body._bvh = this;

      this._bodies.push(body);
    }

    const polygon = body._polygon;
    const body_x = body.x;
    const body_y = body.y;

    if (polygon) {
      if (body._dirty_coords || body.x !== body._x || body.y !== body._y || body.angle !== body._angle || body.scale_x !== body._scale_x || body.scale_y !== body._scale_y) {
        body._calculateCoords();
      }
    }

    const padding = body._bvh_padding;
    const radius = polygon ? 0 : body.radius * body.scale;
    const body_min_x = (polygon ? body._min_x : body_x - radius) - padding;
    const body_min_y = (polygon ? body._min_y : body_y - radius) - padding;
    const body_max_x = (polygon ? body._max_x : body_x + radius) + padding;
    const body_max_y = (polygon ? body._max_y : body_y + radius) + padding;
    body._bvh_min_x = body_min_x;
    body._bvh_min_y = body_min_y;
    body._bvh_max_x = body_max_x;
    body._bvh_max_y = body_max_y;
    let current = this._hierarchy;
    let sort = 0;

    if (!current) {
      this._hierarchy = body;
    } else {
      while (true) {
        // Branch
        if (current._bvh_branch) {
          const left = current._bvh_left;
          const left_min_y = left._bvh_min_y;
          const left_max_x = left._bvh_max_x;
          const left_max_y = left._bvh_max_y;
          const left_new_min_x = body_min_x < left._bvh_min_x ? body_min_x : left._bvh_min_x;
          const left_new_min_y = body_min_y < left_min_y ? body_min_y : left_min_y;
          const left_new_max_x = body_max_x > left_max_x ? body_max_x : left_max_x;
          const left_new_max_y = body_max_y > left_max_y ? body_max_y : left_max_y;
          const left_volume = (left_max_x - left._bvh_min_x) * (left_max_y - left_min_y);
          const left_new_volume = (left_new_max_x - left_new_min_x) * (left_new_max_y - left_new_min_y);
          const left_difference = left_new_volume - left_volume;
          const right = current._bvh_right;
          const right_min_x = right._bvh_min_x;
          const right_min_y = right._bvh_min_y;
          const right_max_x = right._bvh_max_x;
          const right_max_y = right._bvh_max_y;
          const right_new_min_x = body_min_x < right_min_x ? body_min_x : right_min_x;
          const right_new_min_y = body_min_y < right_min_y ? body_min_y : right_min_y;
          const right_new_max_x = body_max_x > right_max_x ? body_max_x : right_max_x;
          const right_new_max_y = body_max_y > right_max_y ? body_max_y : right_max_y;
          const right_volume = (right_max_x - right_min_x) * (right_max_y - right_min_y);
          const right_new_volume = (right_new_max_x - right_new_min_x) * (right_new_max_y - right_new_min_y);
          const right_difference = right_new_volume - right_volume;
          current._bvh_sort = sort++;
          current._bvh_min_x = left_new_min_x < right_new_min_x ? left_new_min_x : right_new_min_x;
          current._bvh_min_y = left_new_min_y < right_new_min_y ? left_new_min_y : right_new_min_y;
          current._bvh_max_x = left_new_max_x > right_new_max_x ? left_new_max_x : right_new_max_x;
          current._bvh_max_y = left_new_max_y > right_new_max_y ? left_new_max_y : right_new_max_y;
          current = left_difference <= right_difference ? left : right;
        } // Leaf
        else {
            const grandparent = current._bvh_parent;
            const parent_min_x = current._bvh_min_x;
            const parent_min_y = current._bvh_min_y;
            const parent_max_x = current._bvh_max_x;
            const parent_max_y = current._bvh_max_y;

            const new_parent = current._bvh_parent = body._bvh_parent = _BVHBranch.default.getBranch();

            new_parent._bvh_parent = grandparent;
            new_parent._bvh_left = current;
            new_parent._bvh_right = body;
            new_parent._bvh_sort = sort++;
            new_parent._bvh_min_x = body_min_x < parent_min_x ? body_min_x : parent_min_x;
            new_parent._bvh_min_y = body_min_y < parent_min_y ? body_min_y : parent_min_y;
            new_parent._bvh_max_x = body_max_x > parent_max_x ? body_max_x : parent_max_x;
            new_parent._bvh_max_y = body_max_y > parent_max_y ? body_max_y : parent_max_y;

            if (!grandparent) {
              this._hierarchy = new_parent;
            } else if (grandparent._bvh_left === current) {
              grandparent._bvh_left = new_parent;
            } else {
              grandparent._bvh_right = new_parent;
            }

            break;
          }
      }
    }
  }
  /**
   * Removes a body from the BVH
   * @param {Circle|Polygon|Point} body The body to remove
   * @param {Boolean} [updating = false] Set to true if this is a temporary removal (used internally when updating the body's position)
   */


  remove(body, updating = false) {
    if (!updating) {
      const bvh = body._bvh;

      if (bvh && bvh !== this) {
        throw new Error('Body belongs to another collision system');
      }

      body._bvh = null;

      this._bodies.splice(this._bodies.indexOf(body), 1);
    }

    if (this._hierarchy === body) {
      this._hierarchy = null;
      return;
    }

    const parent = body._bvh_parent;
    const grandparent = parent._bvh_parent;
    const parent_left = parent._bvh_left;
    const sibling = parent_left === body ? parent._bvh_right : parent_left;
    sibling._bvh_parent = grandparent;

    if (sibling._bvh_branch) {
      sibling._bvh_sort = parent._bvh_sort;
    }

    if (grandparent) {
      if (grandparent._bvh_left === parent) {
        grandparent._bvh_left = sibling;
      } else {
        grandparent._bvh_right = sibling;
      }

      let branch = grandparent;

      while (branch) {
        const left = branch._bvh_left;
        const left_min_x = left._bvh_min_x;
        const left_min_y = left._bvh_min_y;
        const left_max_x = left._bvh_max_x;
        const left_max_y = left._bvh_max_y;
        const right = branch._bvh_right;
        const right_min_x = right._bvh_min_x;
        const right_min_y = right._bvh_min_y;
        const right_max_x = right._bvh_max_x;
        const right_max_y = right._bvh_max_y;
        branch._bvh_min_x = left_min_x < right_min_x ? left_min_x : right_min_x;
        branch._bvh_min_y = left_min_y < right_min_y ? left_min_y : right_min_y;
        branch._bvh_max_x = left_max_x > right_max_x ? left_max_x : right_max_x;
        branch._bvh_max_y = left_max_y > right_max_y ? left_max_y : right_max_y;
        branch = branch._bvh_parent;
      }
    } else {
      this._hierarchy = sibling;
    }

    _BVHBranch.default.releaseBranch(parent);
  }
  /**
   * Updates the BVH. Moved bodies are removed/inserted.
   */


  update() {
    const bodies = this._bodies;
    const count = bodies.length;

    for (let i = 0; i < count; ++i) {
      const body = bodies[i];
      let update = false;

      if (!update && body.padding !== body._bvh_padding) {
        body._bvh_padding = body.padding;
        update = true;
      }

      if (!update) {
        const polygon = body._polygon;

        if (polygon) {
          if (body._dirty_coords || body.x !== body._x || body.y !== body._y || body.angle !== body._angle || body.scale_x !== body._scale_x || body.scale_y !== body._scale_y) {
            body._calculateCoords();
          }
        }

        const x = body.x;
        const y = body.y;
        const radius = polygon ? 0 : body.radius * body.scale;
        const min_x = polygon ? body._min_x : x - radius;
        const min_y = polygon ? body._min_y : y - radius;
        const max_x = polygon ? body._max_x : x + radius;
        const max_y = polygon ? body._max_y : y + radius;
        update = min_x < body._bvh_min_x || min_y < body._bvh_min_y || max_x > body._bvh_max_x || max_y > body._bvh_max_y;
      }

      if (update) {
        this.remove(body, true);
        this.insert(body, true);
      }
    }
  }
  /**
   * Returns a list of potential collisions for a body
   * @param {Circle|Polygon|Point} body The body to test
   * @returns {Array<Body>}
   */


  potentials(body) {
    const results = [];
    const min_x = body._bvh_min_x;
    const min_y = body._bvh_min_y;
    const max_x = body._bvh_max_x;
    const max_y = body._bvh_max_y;
    let current = this._hierarchy;
    let traverse_left = true;

    if (!current || !current._bvh_branch) {
      return results;
    }

    while (current) {
      if (traverse_left) {
        traverse_left = false;
        let left = current._bvh_branch ? current._bvh_left : null;

        while (left && left._bvh_max_x >= min_x && left._bvh_max_y >= min_y && left._bvh_min_x <= max_x && left._bvh_min_y <= max_y) {
          current = left;
          left = current._bvh_branch ? current._bvh_left : null;
        }
      }

      const branch = current._bvh_branch;
      const right = branch ? current._bvh_right : null;

      if (right && right._bvh_max_x > min_x && right._bvh_max_y > min_y && right._bvh_min_x < max_x && right._bvh_min_y < max_y) {
        current = right;
        traverse_left = true;
      } else {
        if (!branch && current !== body) {
          results.push(current);
        }

        let parent = current._bvh_parent;

        if (parent) {
          while (parent && parent._bvh_right === current) {
            current = parent;
            parent = current._bvh_parent;
          }

          current = parent;
        } else {
          break;
        }
      }
    }

    return results;
  }
  /**
   * Draws the bodies within the BVH to a CanvasRenderingContext2D's current path
   * @param {CanvasRenderingContext2D} context The context to draw to
   */


  draw(context) {
    const bodies = this._bodies;
    const count = bodies.length;

    for (let i = 0; i < count; ++i) {
      bodies[i].draw(context);
    }
  }
  /**
   * Draws the BVH to a CanvasRenderingContext2D's current path. This is useful for testing out different padding values for bodies.
   * @param {CanvasRenderingContext2D} context The context to draw to
   */


  drawBVH(context) {
    let current = this._hierarchy;
    let traverse_left = true;

    while (current) {
      if (traverse_left) {
        traverse_left = false;
        let left = current._bvh_branch ? current._bvh_left : null;

        while (left) {
          current = left;
          left = current._bvh_branch ? current._bvh_left : null;
        }
      }

      const branch = current._bvh_branch;
      const min_x = current._bvh_min_x;
      const min_y = current._bvh_min_y;
      const max_x = current._bvh_max_x;
      const max_y = current._bvh_max_y;
      const right = branch ? current._bvh_right : null;
      context.moveTo(min_x, min_y);
      context.lineTo(max_x, min_y);
      context.lineTo(max_x, max_y);
      context.lineTo(min_x, max_y);
      context.lineTo(min_x, min_y);

      if (right) {
        current = right;
        traverse_left = true;
      } else {
        let parent = current._bvh_parent;

        if (parent) {
          while (parent && parent._bvh_right === current) {
            current = parent;
            parent = current._bvh_parent;
          }

          current = parent;
        } else {
          break;
        }
      }
    }
  }

}

exports.default = BVH;
;
},{"./BVHBranch.js":"src/components/Collisions/modules/BVHBranch.js"}],"src/components/Collisions/modules/Result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * An object used to collect the detailed results of a collision test
 *
 * > **Note:** It is highly recommended you recycle the same Result object if possible in order to avoid wasting memory
 * @class
 */
class Result {
  /**
   * @constructor
   */
  constructor() {
    /**
     * @desc True if a collision was detected
     * @type {Boolean}
     */
    this.collision = false;
    /**
     * @desc The source body tested
     * @type {Circle|Polygon|Point}
     */

    this.a = null;
    /**
     * @desc The target body tested against
     * @type {Circle|Polygon|Point}
     */

    this.b = null;
    /**
     * @desc True if A is completely contained within B
     * @type {Boolean}
     */

    this.a_in_b = false;
    /**
     * @desc True if B is completely contained within A
     * @type {Boolean}
     */

    this.b_in_a = false;
    /**
     * @desc The magnitude of the shortest axis of overlap
     * @type {Number}
     */

    this.overlap = 0;
    /**
     * @desc The X direction of the shortest axis of overlap
     * @type {Number}
     */

    this.overlap_x = 0;
    /**
     * @desc The Y direction of the shortest axis of overlap
     * @type {Number}
     */

    this.overlap_y = 0;
  }

}

exports.default = Result;
;
},{}],"src/components/Collisions/modules/SAT.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SAT;

/**
 * Determines if two bodies are colliding using the Separating Axis Theorem
 * @private
 * @param {Circle|Polygon|Point} a The source body to test
 * @param {Circle|Polygon|Point} b The target body to test against
 * @param {Result} [result = null] A Result object on which to store information about the collision
 * @param {Boolean} [aabb = true] Set to false to skip the AABB test (useful if you use your own collision heuristic)
 * @returns {Boolean}
 */
function SAT(a, b, result = null, aabb = true) {
  const a_polygon = a._polygon;
  const b_polygon = b._polygon;
  let collision = false;

  if (result) {
    result.a = a;
    result.b = b;
    result.a_in_b = true;
    result.b_in_a = true;
    result.overlap = null;
    result.overlap_x = 0;
    result.overlap_y = 0;
  }

  if (a_polygon) {
    if (a._dirty_coords || a.x !== a._x || a.y !== a._y || a.angle !== a._angle || a.scale_x !== a._scale_x || a.scale_y !== a._scale_y) {
      a._calculateCoords();
    }
  }

  if (b_polygon) {
    if (b._dirty_coords || b.x !== b._x || b.y !== b._y || b.angle !== b._angle || b.scale_x !== b._scale_x || b.scale_y !== b._scale_y) {
      b._calculateCoords();
    }
  }

  if (!aabb || aabbAABB(a, b)) {
    if (a_polygon && a._dirty_normals) {
      a._calculateNormals();
    }

    if (b_polygon && b._dirty_normals) {
      b._calculateNormals();
    }

    collision = a_polygon && b_polygon ? polygonPolygon(a, b, result) : a_polygon ? polygonCircle(a, b, result, false) : b_polygon ? polygonCircle(b, a, result, true) : circleCircle(a, b, result);
  }

  if (result) {
    result.collision = collision;
  }

  return collision;
}

;
/**
 * Determines if two bodies' axis aligned bounding boxes are colliding
 * @param {Circle|Polygon|Point} a The source body to test
 * @param {Circle|Polygon|Point} b The target body to test against
 */

function aabbAABB(a, b) {
  const a_polygon = a._polygon;
  const a_x = a_polygon ? 0 : a.x;
  const a_y = a_polygon ? 0 : a.y;
  const a_radius = a_polygon ? 0 : a.radius * a.scale;
  const a_min_x = a_polygon ? a._min_x : a_x - a_radius;
  const a_min_y = a_polygon ? a._min_y : a_y - a_radius;
  const a_max_x = a_polygon ? a._max_x : a_x + a_radius;
  const a_max_y = a_polygon ? a._max_y : a_y + a_radius;
  const b_polygon = b._polygon;
  const b_x = b_polygon ? 0 : b.x;
  const b_y = b_polygon ? 0 : b.y;
  const b_radius = b_polygon ? 0 : b.radius * b.scale;
  const b_min_x = b_polygon ? b._min_x : b_x - b_radius;
  const b_min_y = b_polygon ? b._min_y : b_y - b_radius;
  const b_max_x = b_polygon ? b._max_x : b_x + b_radius;
  const b_max_y = b_polygon ? b._max_y : b_y + b_radius;
  return a_min_x < b_max_x && a_min_y < b_max_y && a_max_x > b_min_x && a_max_y > b_min_y;
}
/**
 * Determines if two polygons are colliding
 * @param {Polygon} a The source polygon to test
 * @param {Polygon} b The target polygon to test against
 * @param {Result} [result = null] A Result object on which to store information about the collision
 * @returns {Boolean}
 */


function polygonPolygon(a, b, result = null) {
  const a_count = a._coords.length;
  const b_count = b._coords.length; // Handle points specially

  if (a_count === 2 && b_count === 2) {
    const a_coords = a._coords;
    const b_coords = b._coords;

    if (result) {
      result.overlap = 0;
    }

    return a_coords[0] === b_coords[0] && a_coords[1] === b_coords[1];
  }

  const a_coords = a._coords;
  const b_coords = b._coords;
  const a_normals = a._normals;
  const b_normals = b._normals;

  if (a_count > 2) {
    for (let ix = 0, iy = 1; ix < a_count; ix += 2, iy += 2) {
      if (separatingAxis(a_coords, b_coords, a_normals[ix], a_normals[iy], result)) {
        return false;
      }
    }
  }

  if (b_count > 2) {
    for (let ix = 0, iy = 1; ix < b_count; ix += 2, iy += 2) {
      if (separatingAxis(a_coords, b_coords, b_normals[ix], b_normals[iy], result)) {
        return false;
      }
    }
  }

  return true;
}
/**
 * Determines if a polygon and a circle are colliding
 * @param {Polygon} a The source polygon to test
 * @param {Circle} b The target circle to test against
 * @param {Result} [result = null] A Result object on which to store information about the collision
 * @param {Boolean} [reverse = false] Set to true to reverse a and b in the result parameter when testing circle->polygon instead of polygon->circle
 * @returns {Boolean}
 */


function polygonCircle(a, b, result = null, reverse = false) {
  const a_coords = a._coords;
  const a_edges = a._edges;
  const a_normals = a._normals;
  const b_x = b.x;
  const b_y = b.y;
  const b_radius = b.radius * b.scale;
  const b_radius2 = b_radius * 2;
  const radius_squared = b_radius * b_radius;
  const count = a_coords.length;
  let a_in_b = true;
  let b_in_a = true;
  let overlap = null;
  let overlap_x = 0;
  let overlap_y = 0; // Handle points specially

  if (count === 2) {
    const coord_x = b_x - a_coords[0];
    const coord_y = b_y - a_coords[1];
    const length_squared = coord_x * coord_x + coord_y * coord_y;

    if (length_squared > radius_squared) {
      return false;
    }

    if (result) {
      const length = Math.sqrt(length_squared);
      overlap = b_radius - length;
      overlap_x = coord_x / length;
      overlap_y = coord_y / length;
      b_in_a = false;
    }
  } else {
    for (let ix = 0, iy = 1; ix < count; ix += 2, iy += 2) {
      const coord_x = b_x - a_coords[ix];
      const coord_y = b_y - a_coords[iy];
      const edge_x = a_edges[ix];
      const edge_y = a_edges[iy];
      const dot = coord_x * edge_x + coord_y * edge_y;
      const region = dot < 0 ? -1 : dot > edge_x * edge_x + edge_y * edge_y ? 1 : 0;
      let tmp_overlapping = false;
      let tmp_overlap = 0;
      let tmp_overlap_x = 0;
      let tmp_overlap_y = 0;

      if (result && a_in_b && coord_x * coord_x + coord_y * coord_y > radius_squared) {
        a_in_b = false;
      }

      if (region) {
        const left = region === -1;
        const other_x = left ? ix === 0 ? count - 2 : ix - 2 : ix === count - 2 ? 0 : ix + 2;
        const other_y = other_x + 1;
        const coord2_x = b_x - a_coords[other_x];
        const coord2_y = b_y - a_coords[other_y];
        const edge2_x = a_edges[other_x];
        const edge2_y = a_edges[other_y];
        const dot2 = coord2_x * edge2_x + coord2_y * edge2_y;
        const region2 = dot2 < 0 ? -1 : dot2 > edge2_x * edge2_x + edge2_y * edge2_y ? 1 : 0;

        if (region2 === -region) {
          const target_x = left ? coord_x : coord2_x;
          const target_y = left ? coord_y : coord2_y;
          const length_squared = target_x * target_x + target_y * target_y;

          if (length_squared > radius_squared) {
            return false;
          }

          if (result) {
            const length = Math.sqrt(length_squared);
            tmp_overlapping = true;
            tmp_overlap = b_radius - length;
            tmp_overlap_x = target_x / length;
            tmp_overlap_y = target_y / length;
            b_in_a = false;
          }
        }
      } else {
        const normal_x = a_normals[ix];
        const normal_y = a_normals[iy];
        const length = coord_x * normal_x + coord_y * normal_y;
        const absolute_length = length < 0 ? -length : length;

        if (length > 0 && absolute_length > b_radius) {
          return false;
        }

        if (result) {
          tmp_overlapping = true;
          tmp_overlap = b_radius - length;
          tmp_overlap_x = normal_x;
          tmp_overlap_y = normal_y;

          if (b_in_a && length >= 0 || tmp_overlap < b_radius2) {
            b_in_a = false;
          }
        }
      }

      if (tmp_overlapping && (overlap === null || overlap > tmp_overlap)) {
        overlap = tmp_overlap;
        overlap_x = tmp_overlap_x;
        overlap_y = tmp_overlap_y;
      }
    }
  }

  if (result) {
    result.a_in_b = reverse ? b_in_a : a_in_b;
    result.b_in_a = reverse ? a_in_b : b_in_a;
    result.overlap = overlap;
    result.overlap_x = reverse ? -overlap_x : overlap_x;
    result.overlap_y = reverse ? -overlap_y : overlap_y;
  }

  return true;
}
/**
 * Determines if two circles are colliding
 * @param {Circle} a The source circle to test
 * @param {Circle} b The target circle to test against
 * @param {Result} [result = null] A Result object on which to store information about the collision
 * @returns {Boolean}
 */


function circleCircle(a, b, result = null) {
  const a_radius = a.radius * a.scale;
  const b_radius = b.radius * b.scale;
  const difference_x = b.x - a.x;
  const difference_y = b.y - a.y;
  const radius_sum = a_radius + b_radius;
  const length_squared = difference_x * difference_x + difference_y * difference_y;

  if (length_squared > radius_sum * radius_sum) {
    return false;
  }

  if (result) {
    const length = Math.sqrt(length_squared);
    result.a_in_b = a_radius <= b_radius && length <= b_radius - a_radius;
    result.b_in_a = b_radius <= a_radius && length <= a_radius - b_radius;
    result.overlap = radius_sum - length;
    result.overlap_x = difference_x / length;
    result.overlap_y = difference_y / length;
  }

  return true;
}
/**
 * Determines if two polygons are separated by an axis
 * @param {Array<Number[]>} a_coords The coordinates of the polygon to test
 * @param {Array<Number[]>} b_coords The coordinates of the polygon to test against
 * @param {Number} x The X direction of the axis
 * @param {Number} y The Y direction of the axis
 * @param {Result} [result = null] A Result object on which to store information about the collision
 * @returns {Boolean}
 */


function separatingAxis(a_coords, b_coords, x, y, result = null) {
  const a_count = a_coords.length;
  const b_count = b_coords.length;

  if (!a_count || !b_count) {
    return true;
  }

  let a_start = null;
  let a_end = null;
  let b_start = null;
  let b_end = null;

  for (let ix = 0, iy = 1; ix < a_count; ix += 2, iy += 2) {
    const dot = a_coords[ix] * x + a_coords[iy] * y;

    if (a_start === null || a_start > dot) {
      a_start = dot;
    }

    if (a_end === null || a_end < dot) {
      a_end = dot;
    }
  }

  for (let ix = 0, iy = 1; ix < b_count; ix += 2, iy += 2) {
    const dot = b_coords[ix] * x + b_coords[iy] * y;

    if (b_start === null || b_start > dot) {
      b_start = dot;
    }

    if (b_end === null || b_end < dot) {
      b_end = dot;
    }
  }

  if (a_start > b_end || a_end < b_start) {
    return true;
  }

  if (result) {
    let overlap = 0;

    if (a_start < b_start) {
      result.a_in_b = false;

      if (a_end < b_end) {
        overlap = a_end - b_start;
        result.b_in_a = false;
      } else {
        const option1 = a_end - b_start;
        const option2 = b_end - a_start;
        overlap = option1 < option2 ? option1 : -option2;
      }
    } else {
      result.b_in_a = false;

      if (a_end > b_end) {
        overlap = a_start - b_end;
        result.a_in_b = false;
      } else {
        const option1 = a_end - b_start;
        const option2 = b_end - a_start;
        overlap = option1 < option2 ? option1 : -option2;
      }
    }

    const current_overlap = result.overlap;
    const absolute_overlap = overlap < 0 ? -overlap : overlap;

    if (current_overlap === null || current_overlap > absolute_overlap) {
      const sign = overlap < 0 ? -1 : 1;
      result.overlap = absolute_overlap;
      result.overlap_x = x * sign;
      result.overlap_y = y * sign;
    }
  }

  return false;
}
},{}],"src/components/Collisions/modules/Body.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Result = _interopRequireDefault(require("./Result.js"));

var _SAT = _interopRequireDefault(require("./SAT.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The base class for bodies used to detect collisions
 * @class
 * @protected
 */
class Body {
  /**
   * @constructor
   * @param {Number} [x = 0] The starting X coordinate
   * @param {Number} [y = 0] The starting Y coordinate
   * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
   */
  constructor(x = 0, y = 0, padding = 0) {
    /**
     * @desc The X coordinate of the body
     * @type {Number}
     */
    this.x = x;
    /**
     * @desc The Y coordinate of the body
     * @type {Number}
     */

    this.y = y;
    /**
     * @desc The amount to pad the bounding volume when testing for potential collisions
     * @type {Number}
     */

    this.padding = padding;
    /** @private */

    this._circle = false;
    /** @private */

    this._polygon = false;
    /** @private */

    this._point = false;
    /** @private */

    this._bvh = null;
    /** @private */

    this._bvh_parent = null;
    /** @private */

    this._bvh_branch = false;
    /** @private */

    this._bvh_padding = padding;
    /** @private */

    this._bvh_min_x = 0;
    /** @private */

    this._bvh_min_y = 0;
    /** @private */

    this._bvh_max_x = 0;
    /** @private */

    this._bvh_max_y = 0;
  }
  /**
   * Determines if the body is colliding with another body
   * @param {Circle|Polygon|Point} target The target body to test against
   * @param {Result} [result = null] A Result object on which to store information about the collision
   * @param {Boolean} [aabb = true] Set to false to skip the AABB test (useful if you use your own potential collision heuristic)
   * @returns {Boolean}
   */


  collides(target, result = null, aabb = true) {
    return (0, _SAT.default)(this, target, result, aabb);
  }
  /**
   * Returns a list of potential collisions
   * @returns {Array<Body>}
   */


  potentials() {
    const bvh = this._bvh;

    if (bvh === null) {
      throw new Error('Body does not belong to a collision system');
    }

    return bvh.potentials(this);
  }
  /**
   * Removes the body from its current collision system
   */


  remove() {
    const bvh = this._bvh;

    if (bvh) {
      bvh.remove(this, false);
    }
  }
  /**
   * Creates a {@link Result} used to collect the detailed results of a collision test
   */


  createResult() {
    return new _Result.default();
  }
  /**
   * Creates a Result used to collect the detailed results of a collision test
   */


  static createResult() {
    return new _Result.default();
  }

}

exports.default = Body;
;
},{"./Result.js":"src/components/Collisions/modules/Result.js","./SAT.js":"src/components/Collisions/modules/SAT.js"}],"src/components/Collisions/modules/Circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Body = _interopRequireDefault(require("./Body.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A circle used to detect collisions
 * @class
 */
class Circle extends _Body.default {
  /**
   * @constructor
   * @param {Number} [x = 0] The starting X coordinate
   * @param {Number} [y = 0] The starting Y coordinate
   * @param {Number} [radius = 0] The radius
   * @param {Number} [scale = 1] The scale
   * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
   */
  constructor(x = 0, y = 0, radius = 0, scale = 1, padding = 0) {
    super(x, y, padding);
    /**
     * @desc
     * @type {Number}
     */

    this.radius = radius;
    /**
     * @desc
     * @type {Number}
     */

    this.scale = scale;
  }
  /**
   * Draws the circle to a CanvasRenderingContext2D's current path
   * @param {CanvasRenderingContext2D} context The context to add the arc to
   */


  draw(context) {
    const x = this.x;
    const y = this.y;
    const radius = this.radius * this.scale;
    context.moveTo(x + radius, y);
    context.arc(x, y, radius, 0, Math.PI * 2);
  }

}

exports.default = Circle;
;
},{"./Body.js":"src/components/Collisions/modules/Body.js"}],"src/components/Collisions/modules/Polygon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Body = _interopRequireDefault(require("./Body.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A polygon used to detect collisions
 * @class
 */
class Polygon extends _Body.default {
  /**
   * @constructor
   * @param {Number} [x = 0] The starting X coordinate
   * @param {Number} [y = 0] The starting Y coordinate
   * @param {Array<Number[]>} [points = []] An array of coordinate pairs making up the polygon - [[x1, y1], [x2, y2], ...]
   * @param {Number} [angle = 0] The starting rotation in radians
   * @param {Number} [scale_x = 1] The starting scale along the X axis
   * @param {Number} [scale_y = 1] The starting scale long the Y axis
   * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
   */
  constructor(x = 0, y = 0, points = [], angle = 0, scale_x = 1, scale_y = 1, padding = 0) {
    super(x, y, padding);
    /**
     * @desc The angle of the body in radians
     * @type {Number}
     */

    this.angle = angle;
    /**
     * @desc The scale of the body along the X axis
     * @type {Number}
     */

    this.scale_x = scale_x;
    /**
     * @desc The scale of the body along the Y axis
     * @type {Number}
     */

    this.scale_y = scale_y;
    /** @private */

    this._polygon = true;
    /** @private */

    this._x = x;
    /** @private */

    this._y = y;
    /** @private */

    this._angle = angle;
    /** @private */

    this._scale_x = scale_x;
    /** @private */

    this._scale_y = scale_y;
    /** @private */

    this._min_x = 0;
    /** @private */

    this._min_y = 0;
    /** @private */

    this._max_x = 0;
    /** @private */

    this._max_y = 0;
    /** @private */

    this._points = null;
    /** @private */

    this._coords = null;
    /** @private */

    this._edges = null;
    /** @private */

    this._normals = null;
    /** @private */

    this._dirty_coords = true;
    /** @private */

    this._dirty_normals = true;
    Polygon.prototype.setPoints.call(this, points);
  }
  /**
   * Draws the polygon to a CanvasRenderingContext2D's current path
   * @param {CanvasRenderingContext2D} context The context to add the shape to
   */


  draw(context) {
    if (this._dirty_coords || this.x !== this._x || this.y !== this._y || this.angle !== this._angle || this.scale_x !== this._scale_x || this.scale_y !== this._scale_y) {
      this._calculateCoords();
    }

    const coords = this._coords;

    if (coords.length === 2) {
      context.moveTo(coords[0], coords[1]);
      context.arc(coords[0], coords[1], 1, 0, Math.PI * 2);
    } else {
      context.moveTo(coords[0], coords[1]);

      for (let i = 2; i < coords.length; i += 2) {
        context.lineTo(coords[i], coords[i + 1]);
      }

      if (coords.length > 4) {
        context.lineTo(coords[0], coords[1]);
      }
    }
  }
  /**
   * Sets the points making up the polygon. It's important to use this function when changing the polygon's shape to ensure internal data is also updated.
   * @param {Array<Number[]>} new_points An array of coordinate pairs making up the polygon - [[x1, y1], [x2, y2], ...]
   */


  setPoints(new_points) {
    const count = new_points.length;
    this._points = new Float64Array(count * 2);
    this._coords = new Float64Array(count * 2);
    this._edges = new Float64Array(count * 2);
    this._normals = new Float64Array(count * 2);
    const points = this._points;

    for (let i = 0, ix = 0, iy = 1; i < count; ++i, ix += 2, iy += 2) {
      const new_point = new_points[i];
      points[ix] = new_point[0];
      points[iy] = new_point[1];
    }

    this._dirty_coords = true;
  }
  /**
   * Calculates and caches the polygon's world coordinates based on its points, angle, and scale
   */


  _calculateCoords() {
    const x = this.x;
    const y = this.y;
    const angle = this.angle;
    const scale_x = this.scale_x;
    const scale_y = this.scale_y;
    const points = this._points;
    const coords = this._coords;
    const count = points.length;
    let min_x;
    let max_x;
    let min_y;
    let max_y;

    for (let ix = 0, iy = 1; ix < count; ix += 2, iy += 2) {
      let coord_x = points[ix] * scale_x;
      let coord_y = points[iy] * scale_y;

      if (angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const tmp_x = coord_x;
        const tmp_y = coord_y;
        coord_x = tmp_x * cos - tmp_y * sin;
        coord_y = tmp_x * sin + tmp_y * cos;
      }

      coord_x += x;
      coord_y += y;
      coords[ix] = coord_x;
      coords[iy] = coord_y;

      if (ix === 0) {
        min_x = max_x = coord_x;
        min_y = max_y = coord_y;
      } else {
        if (coord_x < min_x) {
          min_x = coord_x;
        } else if (coord_x > max_x) {
          max_x = coord_x;
        }

        if (coord_y < min_y) {
          min_y = coord_y;
        } else if (coord_y > max_y) {
          max_y = coord_y;
        }
      }
    }

    this._x = x;
    this._y = y;
    this._angle = angle;
    this._scale_x = scale_x;
    this._scale_y = scale_y;
    this._min_x = min_x;
    this._min_y = min_y;
    this._max_x = max_x;
    this._max_y = max_y;
    this._dirty_coords = false;
    this._dirty_normals = true;
  }
  /**
   * Calculates the normals and edges of the polygon's sides
   */


  _calculateNormals() {
    const coords = this._coords;
    const edges = this._edges;
    const normals = this._normals;
    const count = coords.length;

    for (let ix = 0, iy = 1; ix < count; ix += 2, iy += 2) {
      const next = ix + 2 < count ? ix + 2 : 0;
      const x = coords[next] - coords[ix];
      const y = coords[next + 1] - coords[iy];
      const length = x || y ? Math.sqrt(x * x + y * y) : 0;
      edges[ix] = x;
      edges[iy] = y;
      normals[ix] = length ? y / length : 0;
      normals[iy] = length ? -x / length : 0;
    }

    this._dirty_normals = false;
  }

}

exports.default = Polygon;
;
},{"./Body.js":"src/components/Collisions/modules/Body.js"}],"src/components/Collisions/modules/Point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Polygon = _interopRequireDefault(require("./Polygon.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A point used to detect collisions
 * @class
 */
class Point extends _Polygon.default {
  /**
   * @constructor
   * @param {Number} [x = 0] The starting X coordinate
   * @param {Number} [y = 0] The starting Y coordinate
   * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
   */
  constructor(x = 0, y = 0, padding = 0) {
    super(x, y, [[0, 0]], 0, 1, 1, padding);
    /** @private */

    this._point = true;
  }

}

exports.default = Point;
;
Point.prototype.setPoints = undefined;
},{"./Polygon.js":"src/components/Collisions/modules/Polygon.js"}],"src/components/Collisions/Collisions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Circle", {
  enumerable: true,
  get: function () {
    return _Circle.default;
  }
});
Object.defineProperty(exports, "Polygon", {
  enumerable: true,
  get: function () {
    return _Polygon.default;
  }
});
Object.defineProperty(exports, "Point", {
  enumerable: true,
  get: function () {
    return _Point.default;
  }
});
Object.defineProperty(exports, "Result", {
  enumerable: true,
  get: function () {
    return _Result.default;
  }
});
exports.Collisions = exports.default = void 0;

var _BVH = _interopRequireDefault(require("./modules/BVH.js"));

var _Circle = _interopRequireDefault(require("./modules/Circle.js"));

var _Polygon = _interopRequireDefault(require("./modules/Polygon.js"));

var _Point = _interopRequireDefault(require("./modules/Point.js"));

var _Result = _interopRequireDefault(require("./modules/Result.js"));

var _SAT = _interopRequireDefault(require("./modules/SAT.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A collision system used to track bodies in order to improve collision detection performance
 * @class
 */
class Collisions {
  /**
   * @constructor
   */
  constructor() {
    /** @private */
    this._bvh = new _BVH.default();
  }
  /**
   * Creates a {@link Circle} and inserts it into the collision system
   * @param {Number} [x = 0] The starting X coordinate
   * @param {Number} [y = 0] The starting Y coordinate
   * @param {Number} [radius = 0] The radius
   * @param {Number} [scale = 1] The scale
   * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
   * @returns {Circle}
   */


  createCircle(x = 0, y = 0, radius = 0, scale = 1, padding = 0) {
    const body = new _Circle.default(x, y, radius, scale, padding);

    this._bvh.insert(body);

    return body;
  }
  /**
   * Creates a {@link Polygon} and inserts it into the collision system
   * @param {Number} [x = 0] The starting X coordinate
   * @param {Number} [y = 0] The starting Y coordinate
   * @param {Array<Number[]>} [points = []] An array of coordinate pairs making up the polygon - [[x1, y1], [x2, y2], ...]
   * @param {Number} [angle = 0] The starting rotation in radians
   * @param {Number} [scale_x = 1] The starting scale along the X axis
   * @param {Number} [scale_y = 1] The starting scale long the Y axis
   * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
   * @returns {Polygon}
   */


  createPolygon(x = 0, y = 0, points = [[0, 0]], angle = 0, scale_x = 1, scale_y = 1, padding = 0) {
    const body = new _Polygon.default(x, y, points, angle, scale_x, scale_y, padding);

    this._bvh.insert(body);

    return body;
  }
  /**
   * Creates a {@link Point} and inserts it into the collision system
   * @param {Number} [x = 0] The starting X coordinate
   * @param {Number} [y = 0] The starting Y coordinate
   * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
   * @returns {Point}
   */


  createPoint(x = 0, y = 0, padding = 0) {
    const body = new _Point.default(x, y, padding);

    this._bvh.insert(body);

    return body;
  }
  /**
   * Creates a {@link Result} used to collect the detailed results of a collision test
   */


  createResult() {
    return new _Result.default();
  }
  /**
   * Creates a Result used to collect the detailed results of a collision test
   */


  static createResult() {
    return new _Result.default();
  }
  /**
   * Inserts bodies into the collision system
   * @param {...Circle|...Polygon|...Point} bodies
   */


  insert(...bodies) {
    for (const body of bodies) {
      this._bvh.insert(body, false);
    }

    return this;
  }
  /**
   * Removes bodies from the collision system
   * @param {...Circle|...Polygon|...Point} bodies
   */


  remove(...bodies) {
    for (const body of bodies) {
      this._bvh.remove(body, false);
    }

    return this;
  }
  /**
   * Updates the collision system. This should be called before any collisions are tested.
   */


  update() {
    this._bvh.update();

    return this;
  }
  /**
   * Draws the bodies within the system to a CanvasRenderingContext2D's current path
   * @param {CanvasRenderingContext2D} context The context to draw to
   */


  draw(context) {
    return this._bvh.draw(context);
  }
  /**
   * Draws the system's BVH to a CanvasRenderingContext2D's current path. This is useful for testing out different padding values for bodies.
   * @param {CanvasRenderingContext2D} context The context to draw to
   */


  drawBVH(context) {
    return this._bvh.drawBVH(context);
  }
  /**
   * Returns a list of potential collisions for a body
   * @param {Circle|Polygon|Point} body The body to test for potential collisions against
   * @returns {Array<Body>}
   */


  potentials(body) {
    return this._bvh.potentials(body);
  }
  /**
   * Determines if two bodies are colliding
   * @param {Circle|Polygon|Point} target The target body to test against
   * @param {Result} [result = null] A Result object on which to store information about the collision
   * @param {Boolean} [aabb = true] Set to false to skip the AABB test (useful if you use your own potential collision heuristic)
   * @returns {Boolean}
   */


  collides(source, target, result = null, aabb = true) {
    return (0, _SAT.default)(source, target, result, aabb);
  }

}

exports.Collisions = exports.default = Collisions;
;
},{"./modules/BVH.js":"src/components/Collisions/modules/BVH.js","./modules/Circle.js":"src/components/Collisions/modules/Circle.js","./modules/Polygon.js":"src/components/Collisions/modules/Polygon.js","./modules/Point.js":"src/components/Collisions/modules/Point.js","./modules/Result.js":"src/components/Collisions/modules/Result.js","./modules/SAT.js":"src/components/Collisions/modules/SAT.js"}],"src/components/classes/systems/collisionSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Collisions = require("../../Collisions/Collisions.js");

class CollisionSystem {
  constructor(game) {
    this.system = new _Collisions.Collisions();
    this.results = new _Collisions.Result();
    this.entities = [];
    this.game = game;
  }

  addPlayer() {
    let x = this.game.Link.position.x * 32;
    let y = this.game.Link.position.y * 34;
    let link = this.system.createPolygon(x, y + 120, [[0, 0], [0, 30], [30, 30], [30, 0]]);
    this.system.update();
    let potentials = link.potentials();

    for (let body of potentials) {
      if (link.collides(body, this.results)) {
        this.game.Link.position.x -= this.results.overlap_x * 0.1;
        this.game.Link.position.y -= this.results.overlap_y * 0.1;
      }
    }

    this.system.remove(link);
    this.system.update();
  }

  createMap(tilemap) {
    if (tilemap !== undefined) {
      for (let entity of this.entities) {
        entity.remove();
      }

      this.entities = [];
      this.system.update();
      let output = [];

      for (let i = 0; i < tilemap.length / 4; i++) {
        output.push([tilemap[0 + i * 4], tilemap[1 + i * 4], tilemap[2 + i * 4], tilemap[3 + i * 4]]);
      }

      return output;
    }
  }

  makeScreen(tilemap) {
    if (tilemap !== undefined) {
      this.entities.forEach(entity => {
        this.system.remove(entity);
      });
      this.entities = [];

      for (let i = 0; i < tilemap.length; i++) {
        let tile = tilemap[i];
        let temp = this.system.createPolygon(tile[0], tile[1], [[0, 0], [0, 34], [32, 34], [32, 0]]);
        this.entities.push(temp);
      }

      this.system.update();
    }
  }

  drawSystem(context, debug = 'draw') {
    if (debug) {
      this.game.debugMode(context);
    } else if (debug === 'draw') {
      this.system.draw(context);
      this.system.drawBVH(context);
    }
  }

  parseMap() {}

}

exports.default = CollisionSystem;
},{"../../Collisions/Collisions.js":"src/components/Collisions/Collisions.js"}],"src/components/functions/showScreenGrid.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 *
 *
 * @param {CanvasRenderingContext2D} ctx
 */
function showGrid(ctx) {
  let canvas = {
    width: 512,
    height: 480
  };

  for (let i = -16; i <= 496; i += 34) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }

  for (let j = 0; j <= 512; j += 32) {
    ctx.beginPath();
    ctx.moveTo(j, 0);
    ctx.lineTo(j, canvas.height);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(0, 480);
  ctx.lineTo(canvas.width, 480);
  ctx.stroke();
  ctx.fillStyle = 'black';
}

var _default = showGrid;
/*
[0,120,32,34]


*/

exports.default = _default;
},{}],"src/components/functions/createTileMap.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportTiles = exportTiles;
exports.showTileMap = showTileMap;
exports.default = void 0;

var _showScreenGrid = _interopRequireDefault(require("./showScreenGrid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let points = new Set();
let map = [[0, 120, 32, 154], [0, 154, 32, 188], [0, 188, 32, 222], [0, 222, 32, 256], [0, 256, 32, 290], [0, 290, 32, 324], [0, 324, 32, 358], [0, 358, 32, 392], [0, 392, 32, 426], [0, 426, 32, 460], [32, 120, 64, 154], [32, 154, 64, 188], [32, 188, 64, 222], [32, 222, 64, 256], [32, 256, 64, 290], [32, 290, 64, 324], [32, 324, 64, 358], [32, 358, 64, 392], [32, 392, 64, 426], [32, 426, 64, 460], [64, 120, 96, 154], [64, 154, 96, 188], [64, 188, 96, 222], [64, 222, 96, 256], [64, 256, 96, 290], [64, 290, 96, 324], [64, 324, 96, 358], [64, 358, 96, 392], [64, 392, 96, 426], [64, 426, 96, 460], [96, 120, 128, 154], [96, 154, 128, 188], [96, 188, 128, 222], [96, 222, 128, 256], [96, 256, 128, 290], [96, 290, 128, 324], [96, 324, 128, 358], [96, 358, 128, 392], [96, 392, 128, 426], [96, 426, 128, 460], [128, 120, 160, 154], [128, 154, 160, 188], [128, 188, 160, 222], [128, 222, 160, 256], [128, 256, 160, 290], [128, 290, 160, 324], [128, 324, 160, 358], [128, 358, 160, 392], [128, 392, 160, 426], [128, 426, 160, 460], [160, 120, 192, 154], [160, 154, 192, 188], [160, 188, 192, 222], [160, 222, 192, 256], [160, 256, 192, 290], [160, 290, 192, 324], [160, 324, 192, 358], [160, 358, 192, 392], [160, 392, 192, 426], [160, 426, 192, 460], [192, 120, 224, 154], [192, 154, 224, 188], [192, 188, 224, 222], [192, 222, 224, 256], [192, 256, 224, 290], [192, 290, 224, 324], [192, 324, 224, 358], [192, 358, 224, 392], [192, 392, 224, 426], [192, 426, 224, 460], [224, 120, 256, 154], [224, 154, 256, 188], [224, 188, 256, 222], [224, 222, 256, 256], [224, 256, 256, 290], [224, 290, 256, 324], [224, 324, 256, 358], [224, 358, 256, 392], [224, 392, 256, 426], [224, 426, 256, 460], [256, 120, 288, 154], [256, 154, 288, 188], [256, 188, 288, 222], [256, 222, 288, 256], [256, 256, 288, 290], [256, 290, 288, 324], [256, 324, 288, 358], [256, 358, 288, 392], [256, 392, 288, 426], [256, 426, 288, 460], [288, 120, 320, 154], [288, 154, 320, 188], [288, 188, 320, 222], [288, 222, 320, 256], [288, 256, 320, 290], [288, 290, 320, 324], [288, 324, 320, 358], [288, 358, 320, 392], [288, 392, 320, 426], [288, 426, 320, 460], [320, 120, 352, 154], [320, 154, 352, 188], [320, 188, 352, 222], [320, 222, 352, 256], [320, 256, 352, 290], [320, 290, 352, 324], [320, 324, 352, 358], [320, 358, 352, 392], [320, 392, 352, 426], [320, 426, 352, 460], [352, 120, 384, 154], [352, 154, 384, 188], [352, 188, 384, 222], [352, 222, 384, 256], [352, 256, 384, 290], [352, 290, 384, 324], [352, 324, 384, 358], [352, 358, 384, 392], [352, 392, 384, 426], [352, 426, 384, 460], [384, 120, 416, 154], [384, 154, 416, 188], [384, 188, 416, 222], [384, 222, 416, 256], [384, 256, 416, 290], [384, 290, 416, 324], [384, 324, 416, 358], [384, 358, 416, 392], [384, 392, 416, 426], [384, 426, 416, 460], [416, 120, 448, 154], [416, 154, 448, 188], [416, 188, 448, 222], [416, 222, 448, 256], [416, 256, 448, 290], [416, 290, 448, 324], [416, 324, 448, 358], [416, 358, 448, 392], [416, 392, 448, 426], [416, 426, 448, 460], [448, 120, 480, 154], [448, 154, 480, 188], [448, 188, 480, 222], [448, 222, 480, 256], [448, 256, 480, 290], [448, 290, 480, 324], [448, 324, 480, 358], [448, 358, 480, 392], [448, 392, 480, 426], [448, 426, 480, 460], [480, 120, 512, 154], [480, 154, 512, 188], [480, 188, 512, 222], [480, 222, 512, 256], [480, 256, 512, 290], [480, 290, 512, 324], [480, 324, 512, 358], [480, 358, 512, 392], [480, 392, 512, 426], [480, 426, 512, 460]];

function createTileMap(context) {
  (0, _showScreenGrid.default)(context);
  document.addEventListener("click", event => {
    for (let i = 0; i < map.length; i++) {
      if (event.clientX >= map[i][0] && event.clientX <= map[i][2] && event.clientY >= map[i][1] && event.clientY <= map[i][3]) {
        points.add(JSON.stringify([map[i][0], map[i][1], 32, 34]));
      }
    }
  });

  for (let value of points) {
    //@ts-ignore
    let cell = JSON.parse([value]); //@ts-ignore

    context.fillRect(...cell);
  }
}

function exportTiles() {
  let button = document.createElement('button');
  let tiles = [];
  button.innerText = 'Export';
  document.body.appendChild(button);
  button.addEventListener('click', () => {
    for (let value of points) {
      //@ts-ignore
      let cell = JSON.parse([value]); //@ts-ignore

      tiles.push([cell]);
    }

    navigator.clipboard.writeText(`[${tiles}]`).then(() => {
      console.log('copied');
    });
  });
}

function showTileMap(tilemap, context) {
  if (tilemap !== undefined) {
    for (let tile = 0; tile < tilemap.length; tile++) {
      context.fillRect(...tilemap[tile]);
    }
  }
}

var _default = createTileMap;
exports.default = _default;
},{"./showScreenGrid":"src/components/functions/showScreenGrid.ts"}],"src/components/classes/systems/game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gameState = _interopRequireDefault(require("./gameState"));

var _link = _interopRequireDefault(require("../actors/link"));

var _camera = _interopRequireDefault(require("./camera"));

var _pauseScreen = _interopRequireDefault(require("./pauseScreen"));

var _SpriteSheet = _interopRequireDefault(require("./SpriteSheet"));

var _controls = _interopRequireDefault(require("./controls"));

var _messageQueue = _interopRequireDefault(require("./messageQueue"));

var _config = _interopRequireDefault(require("../../objects/config"));

var _collisionSystem = _interopRequireDefault(require("./collisionSystem"));

var _createTileMap = _interopRequireWildcard(require("../../functions/createTileMap"));

var _getImage = _interopRequireDefault(require("../../functions/getImage"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 * @export
 * @class Game
 * @param width The width of the game screen
 * @param height The hieght of the game screen
 * @param json A Json containing all of the games files
 *
 */
class Game {
  /**
   *Creates an instance of Game.
   * @param {number} width
   * @param {number} height
   * @param {*} json
   * @memberof Game
   */
  constructor(width, height, json) {
    this.width = width;
    this.height = height;
    this.gameState = new _gameState.default();
    this.Link = new _link.default();
    this.controls = new _controls.default(_config.default);
    this.json = json;
    this.system = new _collisionSystem.default(this);
    this.camera = new _camera.default();
    this.pauseScreen = new _pauseScreen.default(this);
    this.messageCenter = new _messageQueue.default(this);
    this.images = [];
    this.debugger = false;
    this.toggle = true;
  }
  /**
   *
   *
   * @param {CanvasRenderingContext2D} context
   * @memberof Game
   */


  drawScreen(context) {
    const {
      x,
      y
    } = this.Link.position;
    let link = this.Link.show();
    let pauseMenu = this.pauseScreen.show(this);
    let paused = this.gameState.paused ? 0 : -360;
    this.system.addPlayer();
    this.camera.show(this, context);
    this.images[5].renderSprite(context, link, [x * 32, y * 34 + 120, 30, 30]);
    context.drawImage(pauseMenu(), 0, paused, 512, 480);
    this.rungame(context);
    this.debugMode(context);
  }

  debugMode(context) {
    if (!this.debugger) {
      this.debugger = true;
      let button = document.createElement('button');
      button.innerText = ' Create Tile Map';
      document.body.appendChild(button);
      button.addEventListener('click', () => {
        this.toggle = !this.toggle;
      });
    }

    if (this.toggle) {
      (0, _createTileMap.default)(context);
    } else {
      let index = `${this.gameState.currentMap.position.x},${this.gameState.currentMap.position.y}`;
      (0, _createTileMap.showTileMap)(this.json.tileMap[index], context);
    }
  }

  rungame(context) {
    this.gameState.changeMap(this.Link.position);
    this.controls.setupControls(this.messageCenter);
    this.messageCenter.dispatch();
    this.gameState.changeScreen(this.Link.position, this);
  }
  /**
   *
   *
   * @memberof Game
   */


  loadFiles() {
    let iterator = 0;
    let names = Object.keys(this.json.urls);
    let images = Object.values(this.json.urls).map(url => (0, _getImage.default)(url));
    Promise.all(images).then(response => {
      response.forEach(res => {
        let spriteSheet = new _SpriteSheet.default(res, names[iterator]);

        if (names[iterator] == "link") {
          spriteSheet.makeSprites(this.json);
        }

        this.images.push(spriteSheet);
        iterator++;
      });
    });
  }

}

exports.default = Game;
},{"./gameState":"src/components/classes/systems/gameState.ts","../actors/link":"src/components/classes/actors/link.ts","./camera":"src/components/classes/systems/camera.ts","./pauseScreen":"src/components/classes/systems/pauseScreen.ts","./SpriteSheet":"src/components/classes/systems/SpriteSheet.ts","./controls":"src/components/classes/systems/controls.ts","./messageQueue":"src/components/classes/systems/messageQueue.ts","../../objects/config":"src/components/objects/config.ts","./collisionSystem":"src/components/classes/systems/collisionSystem.ts","../../functions/createTileMap":"src/components/functions/createTileMap.ts","../../functions/getImage":"src/components/functions/getImage.ts"}],"src/components/functions/getjson.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 *
 *
 * @param {string} url
 */
const loadJson = async url => await (await fetch(url)).json();

var _default = loadJson;
exports.default = _default;
},{}],"src/main.ts":[function(require,module,exports) {
"use strict";

var _canvas = _interopRequireDefault(require("./components/functions/canvas"));

var _game = _interopRequireDefault(require("./components/classes/systems/game"));

var _getjson = _interopRequireDefault(require("./components/functions/getjson"));

var _createTileMap = require("./components/functions/createTileMap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let canvas = (0, _canvas.default)();
let ctx = canvas.getContext("2d");
let game;

async function preload() {
  let data = await (0, _getjson.default)("../json/game.json");
  game = new _game.default(512, 480, data);
  game.loadFiles();
  playButton();
}

function setup() {
  canvas.width = 512;
  canvas.height = 480;
  let index = `${game.gameState.currentMap.position.x},${game.gameState.currentMap.position.y}`;
  game.system.makeScreen(game.json.tileMap[index]);
  document.body.appendChild(canvas);
  (0, _createTileMap.exportTiles)();
  draw();
}

function draw() {
  game.drawScreen(ctx);
  loop();
}

function loop() {
  requestAnimationFrame(draw);
}

preload();

function playButton() {
  let button = document.createElement("button");
  button.innerText = "Play Game";
  document.body.appendChild(button);
  button.addEventListener("click", () => {
    game.gameState.currentMap.theme.play();
    setup();
    document.body.removeChild(button);
  });
}
},{"./components/functions/canvas":"src/components/functions/canvas.ts","./components/classes/systems/game":"src/components/classes/systems/game.ts","./components/functions/getjson":"src/components/functions/getjson.ts","./components/functions/createTileMap":"src/components/functions/createTileMap.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62309" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map