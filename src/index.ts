/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { format, Target, Template, TypeLike } from '@kapeta/codegen-target';
import type { GeneratedAsset, SourceFile, GeneratedFile } from '@kapeta/codegen';
import Path from 'path';
import { exec } from '@kapeta/nodejs-process';
import { mergePackageJson } from './target/merge-package';
import { mergeDevcontainers } from './target/merge-devcontainers';
import { addTemplateHelpers } from './target/template-helpers';
import { NodeJSTargetFormatter } from './formatter';

export default class NodeJSTarget extends Target {
    constructor(options: any) {
        super(options, Path.resolve(__dirname, '../'), new NodeJSTargetFormatter());
    }

    mergeFile(sourceFile: SourceFile, newFile: GeneratedFile, lastFile: GeneratedFile): GeneratedFile {
        if (sourceFile.filename === 'package.json') {
            return mergePackageJson(sourceFile, newFile, lastFile);
        }

        if (sourceFile.filename === '.devcontainer/devcontainer.json') {
            return mergeDevcontainers(sourceFile, newFile, lastFile);
        }

        return super.mergeFile(sourceFile, newFile, lastFile);
    }

    protected _createTemplateEngine(data: any, context: any) {
        const engine = super._createTemplateEngine(data, context);

        addTemplateHelpers(engine, data, context);

        return engine;
    }

    protected _postProcessCode(filename: string, code: string) {
        return format(filename, code);
    }

    generate(data: any, context: any): GeneratedFile[] {
        return super.generate(data, context);
    }

    async postprocess(targetDir: string, files: GeneratedAsset[]): Promise<void> {
        const packageJsonChanged = files.some((file) => file.filename === 'package.json');

        if (packageJsonChanged) {
            console.log('Running npm install in %s', targetDir);
            const child = exec('npm install', {
                cwd: targetDir,
            });

            await child.wait();

            console.log('install done');
        }
    }
}
