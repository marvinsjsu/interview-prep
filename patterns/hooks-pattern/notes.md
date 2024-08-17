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
