const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { merge } = require('lodash');

const DIST = 'dist';
const ASSETS_I18N = 'assets/i18n';
const CWD = process.cwd();
const PROJECT_NAME = process.argv[2];
const PROJECT_PATH = path.join(CWD, DIST, PROJECT_NAME);
const PROJECT_ASSETS_I18N = `${PROJECT_PATH}/${ASSETS_I18N}`;

if (!fs.existsSync(PROJECT_PATH)) {
  throw new Error(`Project ${PROJECT_NAME} is not exists!`);
}

const internalLangs = fs.readdirSync(PROJECT_ASSETS_I18N).filter(item => item !== 'shared');
const sharedLangs = fs.readdirSync(`${PROJECT_ASSETS_I18N}/shared`);

internalLangs.forEach(file => {
  const internalLangFile = `${PROJECT_ASSETS_I18N}/${file}`;
  const sharedLangFile = `${PROJECT_ASSETS_I18N}/shared/${file}`;

  const internalLangText = JSON.parse(fs.readFileSync(internalLangFile, 'utf8'));
  const sharedLangText = JSON.parse(fs.readFileSync(sharedLangFile, 'utf8'));

  if (!fs.existsSync(internalLangFile)) {
    throw new Error(`Internal Language File ${internalLangFile} is not exists!`);
  }

  if (!fs.existsSync(sharedLangFile)) {
    throw new Error(`Shared Language File ${sharedLangFile} is not exists!`);
  }

  const combineLangText = merge({}, sharedLangText, internalLangText);
  fs.writeFileSync(internalLangFile, JSON.stringify(combineLangText), 'utf8');
});

rimraf.sync(`${PROJECT_ASSETS_I18N}/shared/`);

console.log('\n\n*** Success merging i18n ! ***\n\n')
