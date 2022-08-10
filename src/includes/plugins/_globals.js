import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export default {
  install(app) {
    // install.meta is available in all Java Script files,
    // it's an object of information, related to the current module
    // Vite extends this object by adding a function called glob()
    // 'Globs' are a feature for searching for files with patterns
    // by default, the glob() function will lazy-load a module
    // we can modify this behaviour. Passing an object with an option eager: true
    // will force the function to load the modules immediately
    // the first argument is a pattern

    const baseComponents = import.meta.glob("../../components/base/*.vue", {
      eager: true,
    });
    //by default, the globe() function will return an object of imported files
    // it is easier to loop through an array, so we're going to convert it into an array

    Object.entries(baseComponents).forEach(([path, module]) => {
      // converting component names into PascalCase with Lodash library
      const componentName = upperFirst(
        camelCase(
          path
            .split("/")
            .pop()
            .replace(/\.\w+$/, "")
        )
      );
      // console.log(path, componentName);

      //export default
      app.component(`${componentName}`, module.default);
    });
  },
};
