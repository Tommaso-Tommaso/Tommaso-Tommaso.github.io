const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const publish = path.join(root, 'publish-temp');
const dist = path.join(root, 'dist');

function ensureDir(dir){
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyFile(srcFile, destFile){
  ensureDir(path.dirname(destFile));
  fs.copyFileSync(srcFile, destFile);
}

function injectHeader(htmlContent, headerHtml){
  if(htmlContent.indexOf('<!-- HEADER -->') !== -1){
    return htmlContent.replace('<!-- HEADER -->', headerHtml);
  }
  // otherwise insert header right after <body>
  return htmlContent.replace(/<body(.*?)>/i, function(m){ return m + '\n' + headerHtml; });
}

function injectFooter(htmlContent, footerHtml){
  if(htmlContent.indexOf('<!-- FOOTER -->') !== -1){
    return htmlContent.replace('<!-- FOOTER -->', footerHtml);
  }
  // otherwise replace empty <footer></footer> if present
  if(/<footer>\s*<\/footer>/i.test(htmlContent)){
    return htmlContent.replace(/<footer>\s*<\/footer>/i, footerHtml);
  }
  // or append before </body>
  return htmlContent.replace(/\<\/body\>/i, function(m){ return footerHtml + '\n' + m; });
}

function copyPages(){
  const pagesSrc = path.join(src, 'pages');
  const pagesDest = path.join(publish, 'pages');
  ensureDir(pagesDest);
  const headerHtml = fs.readFileSync(path.join(src, 'components', 'header.html'), 'utf8');
  const footerHtml = fs.readFileSync(path.join(src, 'components', 'footer.html'), 'utf8');
  const files = fs.readdirSync(pagesSrc).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const content = fs.readFileSync(path.join(pagesSrc, file), 'utf8');
    const withHeader = injectHeader(content, headerHtml);
    const out = injectFooter(withHeader, footerHtml);
    fs.writeFileSync(path.join(pagesDest, file), out, 'utf8');
    console.log('Wrote', file);
  });
}

function copyRootHtml(){
  const indexSrc = path.join(src, 'index.html');
  if(fs.existsSync(indexSrc)){
    const content = fs.readFileSync(indexSrc, 'utf8');
    const headerHtml = fs.readFileSync(path.join(src, 'components', 'header.html'), 'utf8');
    const footerHtml = fs.readFileSync(path.join(src, 'components', 'footer.html'), 'utf8');
    const withHeader = injectHeader(content, headerHtml);
    const out = injectFooter(withHeader, footerHtml);
    fs.writeFileSync(path.join(publish, 'index.html'), out, 'utf8');
    console.log('Wrote index.html');
  }
}

function copyAssets(){
  // styles
  copyFile(path.join(src, 'styles', 'main.css'), path.join(publish, 'styles', 'main.css'));
  console.log('Copied styles');
  // components (ts) - copy as-is for reference
  ensureDir(path.join(publish, 'components'));
  const compFiles = fs.readdirSync(path.join(src, 'components'));
  compFiles.forEach(f => copyFile(path.join(src, 'components', f), path.join(publish, 'components', f)));
}

function copyScripts(){
  // if dist exists, copy compiled JS into publish-temp/scripts
  const outScripts = path.join(publish, 'scripts');
  ensureDir(outScripts);
  const candidate = path.join(dist, 'scripts', 'main.js');
  if(fs.existsSync(candidate)){
    copyFile(candidate, path.join(outScripts, 'main.js'));
    console.log('Copied compiled main.js');
  } else {
    console.log('No compiled main.js found in dist; leaving existing publish-temp/scripts as-is.');
  }
}

function run(){
  ensureDir(publish);
  copyAssets();
  copyRootHtml();
  copyPages();
  copyScripts();
  console.log('Site build complete.');
}

run();
