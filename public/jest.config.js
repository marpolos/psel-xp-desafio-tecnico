"use strict";
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts'],
    testPathDirs: ['./src/tests'],
    verbose: true,
};
