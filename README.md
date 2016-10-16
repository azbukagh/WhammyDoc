# WhammyDoc [![Page on DUB](https://img.shields.io/dub/v/whammydoc.svg)](http://code.dlang.org/packages/whammydoc) [![Licence](https://img.shields.io/dub/l/whammydoc.svg)](https://github.com/azbukagh/whammydoc/blob/master/LICENCE.md)
WhammyDoc is a documentation generator based on [ddox](https://github.com/rejectedsoftware/ddox) and [bootstrap](http://getbootstrap.com/). 

## Using
Just use it like ddox. Do not forget to copy `./public/` directory content when using `generate-html` command.

## Hacking
Requiments:
	* [dub](http://code.dlang.org/getting_started)
	* [npm](https://www.npmjs.com/get-npm)

Use dub to build application.

In `./assets/` directory run `npm install` to install all dependencies.
Run `gulp build` to build CSS/JS.
`gulp watch` watches for changes and automatically builds CSS/JS.

## Examples
	* [glfw3d](https://azbukagh.github.io/glfw3d/)

