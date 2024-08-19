### Provider Pattern

In React, the `Context API` serves as our provider, which makes it easier to share application state
and data across components in our application.

Often times, we use `Redux` or other state management tools to be able to maintain a central location
for our applications state.  We would then create `actions` and `reducers` as a way to update the
state, and use `selectors` as a way to access our state or derive values from the state.  `Redux`
gives us a really good pattern for managing our state and especially when we have a large dev
team or have multiple dev teams that could potentially work on the project, establishing and
following a set of standard patterns is helpful in ensuring our code is easily understood 
and maintainable.  `Redux` is almost self-documenting in that way by the structure of our
code and the pattern devs follow in creating the `actions`, `reducers`, and `selectors`.

Nowadays, we can bounce between using `Context API` or state management tools like `Redux` to make it
easier to share app state for our components.  Prior to these tools, we relied on passing state via
props, called `prop-drilling`.  This could quickly make our applications complex, difficult to 
decouple, and less flexible.  This also affected performance, because it's likely that there
are levels of components that unnecessarily received prop updates, which means unnecessary
re-rendering.  We definitely don't want to do this.

With the Provider pattern via `Context API`,the components that need the data or slice of state will
get this via `useContext`.

```

export const useListings = () => {
    const [listings, setListings] = React.useState([]);

    React.useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch(listingsUrl);
                const data = await response.json();

                if (data && data.listings) {
                    setListings(data.listings);
                }
            } catch (error) {
                console.error('Fetch for listings failed.', error);
            }
        };

        fetchListings();
    }, []);

    return listings;
};
```

```
import { listingsUrl } from 'src/constants/apis';

const ListingsDataContext = React.createContext([]);

export const ListingsDataProvider = ({ children }) => {
    const listings = useListings();

    if (!listings) return null;

    return (
        <ListingsDataContext.Provider value={{ listings }}>
            {children}
        </ListingsDataContext.Provider>
    );
};

export const useListingsDataContext = () => {
    return React.useContext(ListingsDataContext);
};
```

```
import { ListingsDataProvider } from 'src/contexts/listings-data.context.js';

const App = () => {
    return (
        <ListingsDataProvider>
            <MainNav />
            <MainContent />
            <MainFooter />
        </ListingsDataProvider>
    );
}

export default App;
```

```
import { useListingsDataContext } from 'src/contexts/listings-data.context.js';

const MainContent = () => {
    const listings = useListingsDataContext();

    ...
};

export default MainContent;
```


#### Benefits
- Combining the Provider pattern and Hooks pattern is a clean way of organizing our
components and application state.  The context is a slice of concern that we can
create a provider for, then use `useContext` to access
- easy to understand, easy to reuse components and contexts across our application
as it grows


#### Gotchas
- when a value changes in the context, all components that use the context will 
re-render, so there's a risk for performance issues

