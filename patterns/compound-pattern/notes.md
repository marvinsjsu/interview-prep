### Compound Pattern

UI components are often assembled from multiple smaller components.  The Compound pattern
is the idea of keeping these smaller components into a single module or file, where these
smaller components become named parts of a larger component that we import as one.  These
smaller components may share the same context (so using Provider pattern).  The simple
way to view this pattern is that we group components that work together to perform a
single task.

##### React.Children

##### React.cloneElement

#### Benefits
- one single component to import and all sub-component definitions are in one JS file
- the imported component and its sub-components will manage its own state

#### Gotchas
- use of `React.Children.map` is a bit restrictive in that it will pass props to the 
children components, which means, we can't really wrap these children components
with another component unless we specify the props to pass to the wrapped 
components