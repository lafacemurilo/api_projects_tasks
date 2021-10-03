import * as path from 'path';
import moduleAlias from 'module-alias';

/**
 * Pega o diretório atual, volta duas pastas e pega os arquivos.
 */
const files = path.resolve(__dirname, '../..');

/**
 * Trata os arquivos para serem importados
 * Foi feito a configuração no .ts para reconhece-los
 *
 * "paths": {
 *      "@src/*": ["./src/*"],
 *     "@test/*": ["./test/*"]
 *   },
 *  "rootDirs": [
 *   "./src",
 *       "./test"
 *   ]
 *
 * mas apenas lá não basta, pois o código "quebraria" quando compilado para .js
 */

moduleAlias.addAliases({
  '@src': path.join(files, 'src'),
  '@test': path.join(files, 'test'),
});
