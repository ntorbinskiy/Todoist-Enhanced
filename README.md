# Chrome-Extension

_I'll assume that you already read the [Webpack docs](https://webpack.js.org) and the [Chrome Extension](https://developer.chrome.com/extensions/getstarted) docs._

1. Check if your Node.js version is >= 6.
2. Clone the repository.
3. Install [yarn](https://yarnpkg.com/lang/en/docs/install/).
4. Run `yarn`.
5. Change the package's name and description on `package.json`.
6. Change the name of your extension on `./src/manifest.json`.
7. Run `yarn build`
8. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
9. Have fun.

## About files

1. All `img`'s are located at `./src/img`, but, for adding **more** images, you should also **add** them at your `manifest.json` file
2. Also, all `.js`'s files are located at `./src/js`, but, for adding **more** `modules.js` files , you should also **add** them at your `webpack.config.js` file.

# Exporting

Then, you can export it to your Chrome Browser extensions!
Happy coding!
