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

/***/ "./src/ts/point.ts":
/*!*************************!*\
  !*** ./src/ts/point.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Point = /** @class */ (function () {
    function Point(name, p) {
        this.score = 0;
        this.namePlayer = name;
        this.pointHTML = p;
        this.scoreHTML = document.querySelector(".".concat(this.namePlayer, " .score"));
    }
    Point.prototype.init = function () {
        this.score = 0;
        this.scoreHTML.innerHTML = this.score.toString();
    };
    Point.prototype.win = function () {
        this.score++;
        this.scoreHTML.innerHTML = this.score.toString();
    };
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
        this.isWinning = false;
        // currentPoint: Point = circle;
        this.currentPointHTML = '<span class="point circle"></span>';
        // matrice d'adjacence qui represente le table (1 => player1; 2 => player2; 0 => case vide)
        this._adjacentMatrix = [];
        this.dimensionX = x;
        this.dimensionY = y;
    }
    TableGame.prototype.init = function () {
        this.isWinning = false;
        this._adjacentMatrix = [];
        this.createAdjacentMatrix();
        this.drawTable();
    };
    TableGame.prototype.drawTable = function () {
        var casesHTML = "";
        for (var i = 0; i < this.dimensionX; i++) {
            for (var j = 0; j < this.dimensionY; j++) {
                casesHTML += "<div class=\"case\" id=\"".concat(i, ";").concat(j, "\"></div>");
            }
        }
        document.querySelector(".container").innerHTML =
            casesHTML;
    };
    TableGame.prototype.createAdjacentMatrix = function () {
        for (var i = 0; i < this.dimensionX; i++) {
            this._adjacentMatrix.push([0, 0, 0]);
        }
    };
    TableGame.prototype.pushCoords = function (x, y) {
        this._adjacentMatrix[x][y] = this.currentPlayer;
        // console.log(this.adjacentMatrix);
    };
    TableGame.prototype.drawPoint = function (caseHTML) {
        caseHTML.innerHTML = this.currentPointHTML;
        caseHTML.style.cursor = "not-allowed";
    };
    TableGame.prototype.showResult = function (isDraw) {
        var resultHTML = document.querySelector(".result");
        resultHTML.innerHTML = "\n            <div class=\"winner\">".concat(isDraw ? "DRAW !!" : "PLAYER ".concat(this.currentPlayer, " WON !"), "</div>\n            <div class=\"btn-container\">\n                <button class=\"reset\">Reset</button>\n                <button class=\"continue\">Continue</button>\n            </div>");
        // attendre pour afficher un peu la ligne
        setTimeout(function () {
            resultHTML.style.transform = "scale(1)";
        }, 500);
    };
    TableGame.prototype.checkWinner = function () {
        var p = this.currentPlayer;
        // convertir la matrice d'adjacence en string pour faciliter la verification
        // ex : 1,0,0,1,0,0,1,0,0 => 100100100
        var coords = this._adjacentMatrix.toString().split(",").join(""), 
        // ex : 100100100, 010010010, 001001001 (1 => player1; 2 => player2; 0 => case vide)
        col = new RegExp("(2|1|0){0,2}[".concat(p, "](2|1|0){2}[").concat(p, "](2|1|0){2}[").concat(p, "](2|1|0){0,2}")), 
        // ex : 111000000, 000111000, 000000111 (1 => player1; 2 => player2; 0 => case vide)
        row = new RegExp("([".concat(p, "]{3}(2|1|0){6})|((2|1|0){3}[").concat(p, "]{3}(2|1|0){3})|((2|1|0){6}[").concat(p, "]{3})")), 
        // ex : 100010001 (1 => player1; 2 => player2; 0 => case vide)
        diagonal = new RegExp("[".concat(p, "](2|1|0){3}[").concat(p, "](2|1|0){3}[").concat(p, "]")), 
        // ex : 001010100 (1 => player1; 2 => player2; 0 => case vide)
        contreDiagonal = new RegExp("(2|1|0){2}[".concat(p, "](2|1|0){1}[").concat(p, "](2|1|0){1}[").concat(p, "](2|1|0){2}"));
        console.log(coords);
        if (col.test(coords)) {
            console.log("winner circle col" + p);
            var _loop_1 = function (i) {
                var colValue = [], 
                // 1,1,1 ou 2,2,2
                sequence = this_1.currentPlayer
                    .toString()
                    .repeat(3)
                    .split("")
                    .join(",");
                for (var j = 0; j < this_1.dimensionX; j++) {
                    colValue.push(this_1._adjacentMatrix[j][i]);
                }
                if (colValue.toString() === sequence) {
                    // i correspond à la colonne
                    var beginCaseHTML = document.getElementById("".concat(0, ";").concat(i));
                    beginCaseHTML.insertAdjacentHTML("beforeend", '<span class="line col"></span>');
                    var line_1 = document.querySelector(".line");
                    // animation
                    setTimeout(function () {
                        line_1.style.height = "300px";
                    }, 10);
                    // display result
                    this_1.showResult(false);
                    return { value: true };
                }
            };
            var this_1 = this;
            // chercher l'indice de depart pour tracer la ligne
            for (var i = 0; i < this.dimensionX; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return false;
        }
        if (row.test(coords)) {
            console.log("winner circle row" + p);
            var _loop_2 = function (i) {
                // 1,1,1 ou 2,2,2
                var sequence = this_2.currentPlayer
                    .toString()
                    .repeat(3)
                    .split("")
                    .join(",");
                // prendre la ligne en un coup avec this.adjacentMatrix[i]
                if (this_2._adjacentMatrix[i].toString() === sequence) {
                    // i correspond à la ligne
                    var beginCaseHTML = document.getElementById("".concat(i, ";").concat(0));
                    beginCaseHTML.insertAdjacentHTML("beforeend", '<span class="line row"></span>');
                    var line_2 = document.querySelector(".line");
                    // animation
                    setTimeout(function () {
                        line_2.style.width = "300px";
                    }, 10);
                    // display result
                    this_2.showResult(false);
                    return { value: true };
                }
            };
            var this_2 = this;
            for (var i = 0; i < this.dimensionX; i++) {
                var state_2 = _loop_2(i);
                if (typeof state_2 === "object")
                    return state_2.value;
            }
            return false;
        }
        if (diagonal.test(coords)) {
            console.log("winner circle diagonal" + p);
            // depart 0;0
            var beginCaseHTML = document.getElementById("0;0");
            beginCaseHTML.insertAdjacentHTML("beforeend", '<span class="line rotate"></span>');
            var line_3 = document.querySelector(".line");
            // animation
            setTimeout(function () {
                line_3.style.width = "414px";
            }, 10);
            // display result
            this.showResult(false);
            return true;
        }
        if (contreDiagonal.test(coords)) {
            console.log("winner circle contrediagonal" + p);
            // 0;2
            var beginCaseHTML = document.getElementById("0;2");
            beginCaseHTML.insertAdjacentHTML("beforeend", '<span class="line rotate contre"></span>');
            var line_4 = document.querySelector(".line");
            // animation
            setTimeout(function () {
                line_4.style.width = "414px";
            }, 10);
            // display result
            this.showResult(false);
            return true;
        }
        // au cas où il n'y a plus de case vide mais pas de vainquer
        if (!coords.includes("0")) {
            console.log("draw");
            // display result
            this.showResult(true);
            return true;
        }
        return false;
    };
    TableGame.prototype.reset = function (circle, croix) {
        this.init();
        this.currentPlayer = 1;
        this.currentPointHTML = '<span class="point circle"></span>';
        circle.init();
        croix.init();
        var resultHTML = document.querySelector(".result");
        resultHTML.style.transform = "scale(0)";
        resultHTML.innerHTML = "";
    };
    TableGame.prototype.continue = function () {
        this.init();
        var resultHTML = document.querySelector(".result");
        resultHTML.style.transform = "scale(0)";
        resultHTML.innerHTML = "";
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
var point_1 = __webpack_require__(/*! ./point */ "./src/ts/point.ts");
(function () {
    var tableGame = new tableGame_1.default(3, 3), circle = new point_1.default('player1', '<span class="point circle"></span>'), croix = new point_1.default('player2', '<span class="point croix"></span>');
    var container = document.querySelector(".container"), currentPlayerHTML = document.querySelector(".current-player");
    tableGame.init();
    container.onclick = function (e) {
        var target = e.target, coords = target.id.split(";"), x = Number(coords[0]), y = Number(coords[1]);
        // si on a cliqué sur une balise à part la ".case" (ex: .point; gap)
        if (target.innerHTML.length > 0 ||
            coords.length !== 2 ||
            tableGame.isWinning)
            return;
        tableGame.drawPoint(target);
        tableGame.pushCoords(x, y);
        tableGame.isWinning = tableGame.checkWinner();
        // player 1 : circle; player 2: croix
        // change currentPlayer and currentPointHTML
        if (tableGame.currentPlayer === 1) {
            // tableGame.checkWinner(circle, x, y);
            tableGame.currentPlayer = 2;
            tableGame.currentPointHTML = croix.pointHTML;
            currentPlayerHTML.innerHTML = croix.pointHTML;
            // si gagnant
            if (tableGame.isWinning) {
                circle.win();
                btnResult();
            }
        }
        else {
            // tableGame.checkWinner(croix, x, y);
            tableGame.currentPlayer = 1;
            tableGame.currentPointHTML = circle.pointHTML;
            currentPlayerHTML.innerHTML = circle.pointHTML;
            // si gagnant
            if (tableGame.isWinning) {
                croix.win();
                btnResult();
            }
        }
    };
    function btnResult() {
        var btnReset = document.querySelector("button.reset"), btnContinue = document.querySelector("button.continue");
        btnReset.onclick = function () {
            tableGame.reset(circle, croix);
            currentPlayerHTML.innerHTML = circle.pointHTML;
        };
        btnContinue.onclick = function () {
            tableGame.continue();
        };
    }
})();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map