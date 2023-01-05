module.exports = async (runner, args) => {
  try {
    console.log('> PRE: Installing prerequisites (WEB):');

    const rc = args.rc;
    await runner.execute([
      'npm install -D @nrwl/web@14.4.3',
      'npm install -D react-router-dom@6.3.0',
      'npm install --save-dev babel-plugin-react-css-modules',
      'npm install --save-dev @svgr/webpack',
      'npm install --save-dev jwt-decode',
      'npm install --save-dev styled-components',
      'npm install --save-dev @types/styled-components',
      'npm install --save-dev @ant-design/icons',
      'npm install --save-dev antd',
      'npm install --save-dev @svgr/webpack',
      'npm install --save-dev react-hotjar',
      `npx nx g @nrwl/web:app ${rc.path}`
    ], {
      cwd: rc.workspace_path
    })

    console.log('> PRE: requisites ✅ DONE')

  } catch (ex) {
    console.error(ex);
    throw new Error('failed to install web pre-requisites');
  }
}