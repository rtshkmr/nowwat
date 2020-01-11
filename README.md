# Progress for Task Model

Fri Jan 10 09:49:33 +08 2020

1. Task model set up with fields title:string body:text deadline:date completed:boolean
   - used responders gem and namespaced tasks_controller.rb under API so that API calls
     can be responded with json. This works
2. configed webpacker gem
3. added a site_controller and an index view under views/site/index.html.erb
4. Set up basic scaffolding for the components
5. Installed axios via yarn to handle HTTP request and events fetching from the backend
6. started using eslint, configed to airbnb rules
7. Displaying Tasks: the Task.js component:

   - add the react router
   - add external routes to ruby router, pointing to the site_controller's index action

8. Created the <PropsRoute> component, to allow parent components to pass props to children components:
   ```javascript
   // app/javascript/components/PropsRoute.js
   import React from "react";
   import { Route } from "react-router-dom";
   import PropTypes from "prop-types";

   const renderMergedProps = (component, ...rest) => {
     const finalProps = Object.assign({}, ...rest);
     return React.createElement(component, finalProps);
   };

   const PropsRoute = ({ component, ...rest }) => (
     <Route
       {...rest}
       render={routeProps => renderMergedProps(component, routeProps, rest)}
     />
   );

   PropsRoute.propTypes = {
     component: PropTypes.func.isRequired
   };

   export default PropsRoute;
   ```


9.  god bless I almost wanted to cry and the bug was a simple routing issue because of a prop passed in was wrong
    along the way there were so many other bugs. Like using Proptypes is best practice so you don't get type errors, but i kind of 
    didn't set the proper default props, a `undefined` vs `{}` empty object problem

10. added some basic styling based of some tutorial, will look into it later. For now, the styling (App.css is in app/javascript/components/App.css) and is imported into App.js component
    BUG: heroku prcommpiling will fail. so have to put under assets. 
    ANOTHER BUG: the relative file path should be `./../../assets/stylesheets/application.css` and not `../../assets/stylesheets/application.css`.

  css styling stuff: https://www.w3schools.com/css/css_background.asp

11. created the form component. Console logged to check if it renders locally. Form component is really complicated. 
    HEROKU HAS ISSUES PRECOMPILING THE FORM WHAT THE HECK. 
    
    ***possible solution is to run this***: `$ rails assets:precompile`
    I'm gonna try put the logic in the form first. 

    - protip: the submission function, let it render console logs on the object created first! then handle the API side of things
    - abstracted things into helper functions, hope it doesn't mess up the precompilation :(

12. using Pickaday for datepicker.
    - add via yarn 
    - do the import from the form itself
    - ew but the thing is so disgusting

13. callback function for the submission (making the API request)
  - callback is made in the context of the parent component, and passed in the form component
  - submission works 


14. Delete action"
    - declare callback method in editor component and pass to the task component (child) in a similar way
    - settle axios call and subsequent redirects

15. Update Action
  - the routing order is v impt, spent ages trying to fix bug, ended up just putting it in order. See routing "table" in Editor.js
  - there has to be a switch around new/update/delete

https://react-bootstrap.github.io/getting-started/introduction/

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...
