"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 1385:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ App)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "notistack"
var external_notistack_ = __webpack_require__(3142);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
;// CONCATENATED MODULE: external "@emotion/cache"
const cache_namespaceObject = require("@emotion/cache");
var cache_default = /*#__PURE__*/__webpack_require__.n(cache_namespaceObject);
;// CONCATENATED MODULE: ./src/utils/createEmotionCache.tsx

function createEmotionCache() {
    return cache_default()({
        key: "css",
        prepend: true
    });
}

// EXTERNAL MODULE: ./src/utils/store.ts
var store = __webpack_require__(4670);
;// CONCATENATED MODULE: external "@emotion/react"
const react_namespaceObject = require("@emotion/react");
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
;// CONCATENATED MODULE: external "@mui/material/styles"
const styles_namespaceObject = require("@mui/material/styles");
;// CONCATENATED MODULE: ./src/utils/theme.ts

const theme = (0,styles_namespaceObject.createTheme)({
    palette: {
        primary: {
            main: "#1C70E4"
        },
        secondary: {
            main: "#E98D19"
        },
        error: {
            main: "#f44336"
        }
    }
});

;// CONCATENATED MODULE: ./src/pages/_app.tsx








const clientSideEmotionCache = createEmotionCache();
function App({ Component , emotionCache =clientSideEmotionCache , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
        store: store/* store */.h,
        children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.CacheProvider, {
            value: emotionCache,
            children: /*#__PURE__*/ jsx_runtime_.jsx(material_.ThemeProvider, {
                theme: theme,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_notistack_.SnackbarProvider, {
                    maxSnack: 3,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(material_.CssBaseline, {}),
                        /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                            ...pageProps
                        })
                    ]
                })
            })
        })
    });
}


/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 3142:
/***/ ((module) => {

module.exports = require("notistack");

/***/ }),

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [670], () => (__webpack_exec__(1385)));
module.exports = __webpack_exports__;

})();