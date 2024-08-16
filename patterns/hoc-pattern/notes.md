### Higher Order Components Pattern

This is the idea of defining functions that take in a component as an argument and
returning a similar component but with either new properties and/or methods.  This
is a way of being DRY and taking advantage of re-usability.  It's a way for us to
pass logic to a component, by, in a sense, wrapping it on the component.

#### Benefits
- we can re-use this HOC function whenever we need to attach a certain behavior to
a component
- remember that HOC function returns a component defined by a function that returns
the original component with additional props that's been added through the outer
function

```

const withListingsData = (Component) => {
    const WithListingsData = (props) => {
        const [listings, setListings] = useState([]);

        React.useEffect(() => {

            const fetchListings = async () => {
                try {
                    const response = await fetch('https://house-lydiahallie.vercel.app/api/listings');
                    const { data } = await response.json();

                    if (data.listings) {
                        setListings(data.listings);
                    }                    
                } catch (error) {
                    console.error(`Error in fetching listings data: `, error);
                }
            };

            fetchListings();
        }, []);

        // This is one way we can handle naming collisions.
        // We explicitly rename props in our code so:
        // - we let other engineers know of possible naming collisions
        // - we can decide here how to handle props, whether we use
        //   the original prop values, merge them, or only use HOCs
        const { listings: propOriginalListings, ...rest } = props;

        return <Component {...rest} listings={listings} />;
    };

    WithListingsData.displayName = `WithListingsData(${Component.displayName || Component.name || 'Component'})`;

    return WithListingsData;
}

export default withListingsData;

```

#### Gotchas
- the big issue with HOCs is naming collisions; meaning that at times we have no
control on what names are used by the original component we are trying to add 
behavior to, and so when we pass a new prop to it, it may already be using
the same prop name; we can get around this by:
   - using unique prop names, but still not 100% guarantee collisions will be avoided
   - namespacing the HOC's props by adding as a property of an object
   - we can destructure `props` and rename the prop's name that our HOC uses, then
   we pass the `rest` of the props and our HOC's props to the original component
   - merging the props

- can be hard to understand how HOCs work and might not be as readable

- with a combination of `hooks` and `Context API`, we may not really need to use
this as often outside of maybe manipulating the display or presentation of a 
component
