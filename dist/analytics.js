/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./analytics.ts":
/*!**********************!*\
  !*** ./analytics.ts ***!
  \**********************/
/***/ (function() {

eval("function createAnalytics() {\n  var counter = 0;\n  var isDestroyed = false;\n  var listener = function listener() {\n    return counter++;\n  };\n  document.addEventListener('click', listener);\n  return {\n    destroy: function destroy() {\n      document.removeEventListener('click', listener);\n      isDestroyed = true;\n    },\n    getClicks: function getClicks() {\n      if (isDestroyed) return \"Analytics is destroyed. Total links = \".concat(counter);\n      return counter;\n    }\n  };\n}\nwindow['analytics'] = createAnalytics();\n\n//# sourceURL=webpack:///./analytics.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./analytics.ts"]();
/******/ 	
/******/ })()
;