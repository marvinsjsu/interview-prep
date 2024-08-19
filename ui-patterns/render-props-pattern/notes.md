### Render-props Pattern

This is the idea of passing a function as a prop of a component.  This function will then
take a prop value as an argument, passes this to a component that it then returns/renders.
This is another way for us to decouple components.

#### Benefits
- we get flexibility because we explicitly identify the render props for a component and
in turn allow us to pass render functions to these props; then the component can control
what prop value it needs to pass to that render function, so no naming collisions like
we get from HOC

- we are using separation of concerns to decouple our components, helping us with our
code organization, re-usability, and maintainability ... we're able to swap
render-props whenever we need to

- is a solution to HOC's issue of naming collisions, because with render props we are
in control of what prop value we pass to the component and to what prop name of the
component


```
const ListingsDisplay = (props) => {
    const [data, setData] = React.useState(null);
    const { url, renderImage, renderLocation } = props;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data) {
                    setData(data);
                }
            } catch (error) {
                console.error('Error in fetching data.', error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {renderImage(data.imgUrl)}
            {renderLocation(data.location)}
        </>
    );
}

export default ListingsDisplay;

```

```
import ListingsDisplay from './ListingsDisplay';

const ImagePresentation = ({ imgUrl }) => {
    return (
        <div className='img-box'>
            <img src={imgUrl} alt='example of listing img' />
        </div>
    );
}

const LocationPresentation = ({ location }) => {
    return (
        <div className='location-box'>
            <h4>{location.city}</h4>
            <h5>{location.state}</h5>
        </div>
    );
}

const MainPage = () => {
    return <ListingsDisplay
        renderLocation={(location) => <LocationPresentation location={location} />}
        renderImage={(imgUrl) => <ImagePresentation imgUrl={imgUrl} />}
        url={'https://house-lydiahallie.vercel.app/api/listings'}
    />
};

export default MainPage;

```

#### Gotchas
- with `hooks` we can bypass this, like we can bypass `HOC`s