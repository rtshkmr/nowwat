# Progress

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
