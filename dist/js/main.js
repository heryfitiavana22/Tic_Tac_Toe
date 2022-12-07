/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/ts/circle.ts":
/*!**************************!*\
  !*** ./src/ts/circle.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var point_1 = __webpack_require__(/*! ./point */ "./src/ts/point.ts");
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype.createAdjacentMatrix = function (x, y) {
        for (var i = 0; i < x; i++) {
            this.adjacentMatrix.push([0, 0, 0]);
        }
        // console.log(this.adjacentMatrix);
    };
    Circle.prototype.pushCoords = function (x, y) {
        this.adjacentMatrix[x][y] = 1;
        // console.log(this.adjacentMatrix);
    };
    Circle.prototype.check = function (coordsWinner) {
        // convertir la matrice d'adjacence en string pour faciliter la verification
        // ex : 1,0,0,1,0,0,1,0,0 => 100100100
        var coords = this.adjacentMatrix.toString().split(",").join(""), 
        // ex : 100100100, 010010010, 001001001
        col = /(1|0){0,2}[1](1|0){2}[1](1|0){2}[1](1|0){0,2}/, 
        // ex : 111000000, 000111000, 000000111
        row = /([1]{3}(1|0){6})|((1|0){3}[1]{3}(1|0){3})|((1|0){6}[1]{3})/, 
        // ex : 100010001
        diagonal = /[1](1|0){3}[1](1|0){3}[1]/, 
        // ex : 001010100
        contreDiagonal = /(1|0){2}[1](1|0){1}[1](1|0){1}[1](1|0){2}/;
        console.log(coords);
        if (col.test(coords)) {
            console.log("winner circle col");
        }
        if (row.test(coords)) {
            console.log("winner circle row");
        }
        if (diagonal.test(coords)) {
            console.log("winner circle diagonal");
        }
        if (contreDiagonal.test(coords)) {
            console.log("winner circle contrediagonal");
        }
    };
    return Circle;
}(point_1.default));
exports["default"] = Circle;


/***/ }),

/***/ "./src/ts/croix.ts":
/*!*************************!*\
  !*** ./src/ts/croix.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var point_1 = __webpack_require__(/*! ./point */ "./src/ts/point.ts");
var Croix = /** @class */ (function (_super) {
    __extends(Croix, _super);
    function Croix() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Croix.prototype.createAdjacentMatrix = function (x, y) {
        for (var i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                this.adjacentMatrix.push([0, 0, 0]);
            }
        }
    };
    Croix.prototype.pushCoords = function (x, y) {
        // this.adjacentMatrix[x][y] = 1
    };
    Croix.prototype.check = function (coordsWinner) {
        var coords = this.adjacentMatrix.toString();
        // console.log(coords);
        if (coords.includes("1,1,1")) {
            console.log("winner croix");
        }
    };
    return Croix;
}(point_1.default));
function push(U, V) {
    return U.length === 0 ? __spreadArray([], V, true) : __spreadArray(__spreadArray([], U, true), V, true);
}
exports["default"] = Croix;


/***/ }),

/***/ "./src/ts/point.ts":
/*!*************************!*\
  !*** ./src/ts/point.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Point = /** @class */ (function () {
    function Point(x, y) {
        // list coordinate
        this.adjacentMatrix = [];
        // this.adjacentMatrix[x][y] = 1
    }
    return Point;
}());
exports["default"] = Point;


/***/ }),

/***/ "./src/ts/tableGame.ts":
/*!*****************************!*\
  !*** ./src/ts/tableGame.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var TableGame = /** @class */ (function () {
    function TableGame(x, y) {
        this.currentPlayer = 1;
        // currentPoint: Point = circle;
        this._currentPointHTML = '<span class="point circle"></span';
        this.x = x;
        this.y = y;
    }
    TableGame.prototype.drawTable = function () {
        var casesHTML = "";
        for (var i = 0; i < this.x; i++) {
            for (var j = 0; j < this.y; j++) {
                casesHTML += "<div class=\"case\" id=\"".concat(i, ";").concat(j, "\"></div>");
            }
        }
        document.querySelector(".container").innerHTML =
            casesHTML;
    };
    TableGame.prototype.drawPoint = function (caseHTML) {
        // if there is a point
        if (caseHTML.innerHTML.length > 0)
            return;
        caseHTML.innerHTML = this._currentPointHTML;
        caseHTML.style.cursor = "not-allowed";
        // player 1 : circle; player 2: croix
        // change currentPointHTML , currentPlayer and currentPoint
        if (this.currentPlayer === 1) {
            return (this._currentPointHTML =
                '<span class="point croix"></span>');
        }
        this._currentPointHTML = '<span class="point circle"></span';
    };
    TableGame.prototype.getCoordsWinner = function () {
        // sequence des coordonnée gagnant
        var coordsWinner = [];
        var diagonal = [];
        for (var i = 1; i <= this.x; i++) {
            var col = [], row = [];
            for (var j = 1; j <= this.y; j++) {
                col.push([i, j]);
                row.push([j, i]);
            }
            coordsWinner.push([col]);
            coordsWinner.push([row]);
            diagonal.push([i, i]);
        }
        coordsWinner.push([diagonal]);
        // contre diagonal
        var contreDiagonal = [
            [3, 1],
            [2, 2],
            [1, 3],
        ];
        coordsWinner.push([contreDiagonal]);
        return coordsWinner;
    };
    TableGame.prototype.checkWinner = function (currentPoint, coordsWinner, x, y) {
        currentPoint.pushCoords(x, y);
        currentPoint.check(coordsWinner);
    };
    return TableGame;
}());
function checkDimension(x) {
    // if(x !== y) throw new Error("x is not equal to y")
    // if((x < 3) || (x > 5)) throw new Error("dimension between 3 and 5")
    return function (constructor, propertykey) {
        console.log(constructor);
    };
}
exports["default"] = TableGame;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ../css/style.css */ "./src/css/style.css");
var tableGame_1 = __webpack_require__(/*! ./tableGame */ "./src/ts/tableGame.ts");
var circle_1 = __webpack_require__(/*! ./circle */ "./src/ts/circle.ts");
var croix_1 = __webpack_require__(/*! ./croix */ "./src/ts/croix.ts");
var tableGame = new tableGame_1.default(3, 3);
// tableGame.drawTable();
var coordsWinner = tableGame.getCoordsWinner();
var circle = new circle_1.default(0, 0), croix = new croix_1.default(0, 0);
circle.createAdjacentMatrix(3, 3);
croix.createAdjacentMatrix(3, 3);
var container = document.querySelector(".container");
container.onclick = function (e) {
    var target = e.target, coords = target.id.split(";"), x = Number(coords[0]), y = Number(coords[1]);
    // si on a cliqué sur une balise à part la ".case" (ex: .point; gap)
    if (coords.length !== 2)
        return;
    tableGame.drawPoint(target);
    // check winner and change currentPlayer
    if (tableGame.currentPlayer === 1) {
        tableGame.checkWinner(circle, coordsWinner, x, y);
        tableGame.currentPlayer = 2;
    }
    else {
        tableGame.checkWinner(croix, coordsWinner, x, y);
        tableGame.currentPlayer = 1;
    }
};

})();

/******/ })()
;
//# sourceMappingURL=main.js.map