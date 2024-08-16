### Container/Presentation Pattern

This is about dedicating and organizing components based on one specific concern.  React gives us
a lot of freedom when it comes to the structure of our projects, but applying the concept of
`container` components and `presentation` components, helps us organize our code so, beyond
having decoupled code, it will be easier to eventually maintain.

#### Benefits
- defines the two roles for the components the basic roles of our components in the application;
there's components dedicated or concerned with fetching data and managing state, and
there are components dedicated to or concerned with how to display data
- an example of organization is having a `container` folder for container component and
`presentational` folder for presentation components (I usually have the structure below)

```
/src
- components
--- pages
------ home
--------- home-component-1.component.js
--------- home-component-2.component.js
------ admin
--------- admin-component-1.component.js
--------- admin-component-2.component.js
------ portfolio
--------- portfolio-component-1.component.js
------ common
---------- left-nav-component-1.component.js
---------- right-nav-component-1.component.js
- containers
--- analytics.containers.js
--- user-settings.containers.js
--- portfolio-charts.containers.js
- pages
--- home
------ index.page.jsx
--- admin
------ index..page.jsx
--- portfolio
------ index.page.jsx
- index.jsx / index.tsx
- App.jsx / App.tsx
- index.html
- package.json
```
- decoupling by concerns makes our container and presentation components, makes them be more flexible
and makes them easier to update; for example, if there's a design change that doesn't involve a
change in data, then we can just update the presentation component without having to worry 
about affecting how the data is fetched

- presentational components are usually pure functions, which makes it really easy to test and at the
same time easy to re-use across our application

#### Gotchas
- with `hooks`, we often times bypass this pattern because it's so convenient to do both data fetching
and data display in the same component cuz the `hook` itself is already decoupled
