import { RollupOptions } from 'rollup';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import path from 'path';

type Options = {
    input: string;
    packageDir: string;
    external: RollupOptions['external'];
    banner: string;
    jsName: string;
    outputFile: string;
    globals: Record<string, string>;
};

const umdDevPlugin = (type: 'development' | 'production') =>
    replace({
        'process.env.NODE_ENV': `"${type}"`,
        delimiters: ['', ''],
        preventAssignment: true,
    });

const babelPlugin = babel({
    babelHelpers: 'bundled',
    exclude: /node_modules/,
    extensions: ['.ts', '.tsx'],
});

export default function rollup(): RollupOptions[] {
    return [
        ...buildConfigs({
            name: 'useForm',
            packageDir: '.',
            jsName: 'useForm',
            outputFile: 'useForm',
            entryFile: 'src/index.ts',
            globals: {},
        }),
    ];
}

function buildConfigs(opts: {
    packageDir: string;
    name: string;
    jsName: string;
    outputFile: string;
    entryFile: string;
    globals: Record<string, string>;
}): RollupOptions[] {
    const input = path.resolve(opts.packageDir, opts.entryFile);
    const externalDeps = Object.keys(opts.globals);

    const external = (moduleName: string) => externalDeps.includes(moduleName);
    const banner = createBanner(opts.name);

    const options: Options = {
        input,
        jsName: opts.jsName,
        outputFile: opts.outputFile,
        packageDir: opts.packageDir,
        external,
        banner,
        globals: opts.globals,
    };

    return [esm(options), cjs(options), umdDev(options), umdProd(options)];
}

function esm({ input, packageDir, external, banner }: Options): RollupOptions {
    return {
        // ESM
        external,
        input,
        output: {
            format: 'esm',
            sourcemap: true,
            dir: `${packageDir}/build/esm`,
            banner,
        },
        plugins: [babelPlugin, nodeResolve({ extensions: ['.ts', '.tsx'] })],
    };
}

function cjs({ input, external, packageDir, banner }: Options): RollupOptions {
    return {
        // CJS
        external,
        input,
        output: {
            format: 'cjs',
            sourcemap: true,
            dir: `${packageDir}/build/cjs`,
            preserveModules: true,
            exports: 'named',
            banner,
        },
        plugins: [babelPlugin, nodeResolve({ extensions: ['.ts', '.tsx'] })],
    };
}

function umdDev({ input, external, packageDir, globals, banner, jsName }: Options): RollupOptions {
    return {
        // UMD (Dev)
        external,
        input,
        output: {
            format: 'umd',
            sourcemap: true,
            file: `${packageDir}/build/umd/index.development.js`,
            name: jsName,
            globals,
            banner,
        },
        plugins: [babelPlugin, nodeResolve({ extensions: ['.ts', '.tsx'] }), umdDevPlugin('development')],
    };
}

function umdProd({ input, external, packageDir, globals, banner, jsName }: Options): RollupOptions {
    return {
        // UMD (Prod)
        external,
        input,
        output: {
            format: 'umd',
            sourcemap: true,
            file: `${packageDir}/build/umd/index.production.js`,
            name: jsName,
            globals,
            banner,
        },
        plugins: [
            babelPlugin,
            nodeResolve({ extensions: ['.ts', '.tsx'] }),
            umdDevPlugin('production'),
            terser({
                mangle: true,
                compress: true,
            }),
            visualizer({
                filename: `${packageDir}/build/stats-html.html`,
                gzipSize: true,
            }),
            visualizer({
                filename: `${packageDir}/build/stats.json`,
                json: true,
                gzipSize: true,
            }),
        ],
    };
}

function createBanner(libraryName: string) {
    return `/**
 * ${libraryName}
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */`;
}
