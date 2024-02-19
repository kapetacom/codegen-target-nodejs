//#FILENAME:rollup.config.mjs:create-only
import packageJson from './package.json' assert { type: 'json' };
import commonjs from '@rollup/plugin-commonjs';
import tsConfigPaths from 'rollup-plugin-tsconfig-paths';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            name: packageJson.name,
            generatedCode: 'es2015',
            compact: true,
            sourcemap: true,
        },
    ],
    plugins: [
        commonjs({
            include: /node_modules/, // Ensure that only node_modules are processed
        }),
        tsConfigPaths({
            tsConfigPath: './tsconfig.build.json',
        }),
        json({
            namedExports: false,
        }),
        nodeResolve({
            moduleDirectories: ['.', 'node_modules'],
            preferBuiltins: true,
        }),
        typescript({
            tsconfig: './tsconfig.build.json',
        }),
        terser(),
        bundleSize(),
    ],
};
