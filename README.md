# ck.Actions

This document is written as a part of the documentation to the ck.Actions libraries. In the past running javascript functions 
has been quite easy, but the complexity of the larger applcations has left a large part of the structure of the application
to the imagination of the programmer.

With ck.Actions I hope to generate a small set of functionality which will help programmers build more robust and powerful
applications and will bring a more "functional" style of programming to the mainstream JavaScript programmer.

## Project Structure

The project is structured into three parts.

 1* The source which can be found in `./src`
 2* The tests which can be found in `./tests`
 3* The distribution which can be found in `./dist`

I can wholeheartedly advice you to compile the source and run the tests before using the application. This is not because that
is "safer" but doing these things give a unique insight in the workings of the ck.Actions library.

You can build the source by going into the `./src` directory and running the TypeScript compiler (`tsc`). You should use at least 
TypeScript 2.0 which, while writing this, is installable by running: `npm install typescript@next -g`. You can now invoke the 
TypeScript compiler. 

I use a unique TypeScript configuration for my source and my tests. My tests are concatted into a single file which
you can load using [systemjs](https://github.com/systemjs/systemjs). 

The `index.html` file in the tests folder looks has the following "meat and bones":

```HTML
<script src="./../dist/tests/out.js"></script>

<script>
  System.import('tests/action.spec').then(r => {
    r.default();
  });
</script>
```

Other test files would either be added in the `index.html` or I'll add a `main.spec.ts` file and just import all the other tests.


## TypeScript

I use TypeScript in this project because it makes functions and their types more explicite. 