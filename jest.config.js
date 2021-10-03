const { resolve } = require('path')

const root = resolve(__dirname); // diretório raiz

module.exports = {
    rootDir: root,
    displayName: 'root-tests', //é um label no teste para reconhece-lo nos logss
    testMatch: ['<rootDir>/src/**/*.test.ts'], /*esse arquivo só dara merge nos testes
		que estão dentro -- no caso -- da pasta src/ */
    testEnvironment: 'node', // ambiente de teste: node
    clearMocks: true,  // limpa mocks
    preset: 'ts-jest', //liga o jest com o ts-jest
    moduleNameMapper: { //usa o aligns
        '@src/(.*)': '<rootDir>/src/$1',
        '@test/(.*)': '<rootDir>/test/$1'
    }

}