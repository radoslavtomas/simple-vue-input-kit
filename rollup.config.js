import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import VuePlugin from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: "src/index.js",
    output: {
        file: "dist/index.js",
        format: "es"
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**', // only transpile our source code,
            runtimeHelpers: true,
        }),
        VuePlugin(),
        postcss(),
        vue(),
        // nodeResolve({
        //     jsnext: true,
        //     main: true
        // }),
        //
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            // include: 'node_modules/**',  // Default: undefined
            // exclude: [ 'node_modules/**' ],  // Default: undefined
            // these values can also be regular expressions
            // include: /node_modules/

            // search for files other than .js files (must already
            // be transpiled by a previous plugin!)
            extensions: [ '.js', '.vue', '.css' ],  // Default: [ '.js' ]

            // if true then uses of `global` won't be dealt with by this plugin
            ignoreGlobal: false,  // Default: false

            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: false,  // Default: true

            // explicitly specify unresolvable named exports
            // (see below for more details)
            // namedExports: { 'react': ['createElement', 'Component' ] },  // Default: undefined

            // sometimes you have to leave require statements
            // unconverted. Pass an array containing the IDs
            // or a `id => boolean` function. Only use this
            // option if you know what you're doing!
            // ignore: [ 'conditional-runtime-dependency' ]
        })
    ]
}