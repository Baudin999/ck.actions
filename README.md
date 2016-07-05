# ck.Actions

This document is written as a part of the documentation to the ck.Actions libraries. In the past running javascript functions 
has been quite easy, but the complexity of the larger applcations has left a large part of the structure of the application
to the imagination of the programmer.

With ck.Actions I hope to generate a small set of functionality which will help programmers build more robust and powerful
applications and will bring a more "functional" style of programming to the mainstream JavaScript programmer.

## Setting up the project


Prerequisites: 

 1. Node installed
 2. NPM installed
 3. Git Installed

(NOTE: you should have JSPM installed: `npm install -g jspm`) <br />
(NOTE: after running npm install the installation script wants to install the typings used with TypeScript. You should
have typings installed: `npm install -g typings`)


Step 1: Clone the project
`git clone https://github.com/Baudin999/ck.actions.git`

Step 2: Go to directory 
`cd ck.actions`

Step 3: install the npm packages
`npm install`

Step 4: install the jspm packages
`jspm install`


Step 5: run the compiler
``

This should be enough to run the application. The rest of the document explains how to use the ck.actions library.


## Project Structure

The project is structured into three parts.

 1. The source which can be found in `./src`
 2. The tests which can be found in `./tests`
 3. The distribution which can be found in `./dist` after compilation

I can wholeheartedly advice you to compile the source and run the tests before using the library. This is not because it
is "safer" but compiling and looking at the tests gives a unique insight in the workings of the ck.Actions library.

You can build the source by going running `npm run dev`. 
You can run the tests by running `npm run test`.

You should use TypeScript 2.0 (the current nightly).

