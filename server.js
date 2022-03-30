const express = require('express');
const compression = require('compression');

const mime = express.static.mime;

mime.define({
    "application/json": ["czml", "json", "geojson", "topojson"],
    "application/wasm": ["wasm"],
    "image/crn": ["crn"],
    "image/ktx": ["ktx"],
    "model/gltf+json": ["gltf"],
    "model/gltf-binary": ["bgltf", "glb"],
    "application/octet-stream": [
        "b3dm",
        "pnts",
        "i3dm",
        "cmpt",
        "geom",
        "vctr",
    ],
    "text/plain": ["glsl"],
    "application/javascript": ["js"]
},
    true
);
const app = express();

app.use(compression());

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use(express.static(__dirname));
app.use(function (req, res) {
    res.send('请检查路径是否正确')
})

const PORT = 8899
app.listen(PORT, () => {
    console.log(`gis data server running at port: ${PORT}`)
})