### Hooks Pattern

React hooks were added in React 16.8 and made functional components super useful. Because
with hooks, functional components can work like class components, able to maintain state
and have some form of access to life-cycle methods; to maintain state with `useState`
and `useEffect` for `componentDidMount`, `componentDidUpdate`, and
`componentWillUnmount`.

React gives us the following built-in hooks:
- `useState`: for maintaining state
- `useEffect`: for side-effects like fetching data, adding and removing event listeners
- `useContext`: for storing state and making it available to components
- `useRef`: for creating a reference
- `useCallback`: memoizes a function so we avoid creating a new function each time the component renders which means if we're passing the function as a prop to a child component, that child component won't unnecessarily re-render because of the "new" prop
- `useMemo`: memoizes a function's result that might require heavy computation.  The function will
only re-compute if there are any dependency changes, which helps optimize components by providing
a way to avoid expensive re-calculations

##### `React.memo` vs `useMemo`
`React.memo` is used for memo-izing a component; if the component's prop values don't
change (based on shallow-comparison), then the memoed component is returned, which
means no unnecessary re-render.  While `useMemo` is used to memoize a function's
result or output to avoid having to re-compute the value for each re-render.

Since we're talking about life-cycle methods, these are the methods class-defined components
have access to:
- `constructor`
- `componentDidMount`
- `componentDidUpdate`
- `componentWillUnmount`
- `render`

React also has these phases:
- mounting: `constructor`, `static getDerivedStateFromProps`, `render`, `componentDidMount`

- updating: `static getDerivedStateFromProps`, `shouldComponentUpdate`, `render`, `getSnapshotBeforeUpdate`, `componentDidUpdate`
    This phase is triggered by changes in props or an update in state via `setState()`, or a `forceUpdate()`

- unmounting: `componentWillUnmount`

##### `getDerivedStateFromProps`
- introduced in React 16.3 as the better alternative to `componentWillReceiveProps`

```
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.highlightedItem !== prevState.highlightedItem) {
      // Update the state to match the new highlighted item from props
      return {
        highlightedItem: nextProps.highlightedItem,
      };
    }
    // Return null if no state needs to be updated
    return null;
  }
```

#### Benefits
- functional components used to be only used for presentational purposes (as a way to display data),
and we would use class components as a container because these would have a way to maintain state
and use life-cycle methods.  The benefit of using functional components is that these would often
be less verbose and less complex than class-defined components.  With hooks, we can define
components the functional way and then have the benefits of a class-defined component
- components are typically built with less code and easier to to understand with hooks
- we maintain separation of concerns because custom hooks will be dedicated for a
specific behavior or logic
- hooks can be easily re-used
- easy to build custom hooks using combinations of built-in hooks

```
const useHovering = () => {
    const [isHovering, setIsHovering] = React.useState(false);
    const ref = React.useRef(null);

    const onMouseover = () => setIsHovering(true);
    const onMouseout = () => setIsHovering(false);

    React.useEffect(() => {
        const node = ref.current;

        if (node) {
            node.addEventListener('mouseover', onMouseover);
            node.addEventListener('mouseout', onMouseout);
        }

        return () => {
            if (node) {
                node.removeEventListener('mouseover', onMouseover);
                node.removeEventListener('mouseout', onMouseout);
            }
        };
    }, [ref.current]);

    return [ref, isHovering];
}

export default useHovering;
```

```
const ListItem = (props) => {
    const [ref, isHovering] = useHovering();
    const { label } = props;

    return (
        <li ref={ref}>
            {label}
            {isHovering && ' hovering on me'}
        </li>
    );
}

export default ListItem;
```

#### Gotchas
- hooks require us to follow rules:
    - must start with `use` in the name; this is how React knows this is a hook
    - must be used in a React functions: functional components or custom hooks
    - must be used in the top-level and not be inside any if-statements, loops
    or nested functions

