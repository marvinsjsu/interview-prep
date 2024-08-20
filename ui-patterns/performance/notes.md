### Performance Patterns

For our application to be performant, we need to use different tools so browsers are able
to download and execute our code in an efficient way.  Having our code or application be
performant helps with the user and dev experience.


#### Bundling
We use bundlers like Webpack, Vite, Parcel, and Rollup to help us make sure all the code
that our application uses is included in one or more bundles that our browser will 
download and execute.  The bundlers will run during build phase where we configure
it to start looking from an entry point file, where it then traverses all the 
imports to include code from other modules or files.  This bundling helps our
application's performance because in the process of generating our bundles,
we can configure the bundler to execute steps that:
- translates or transpiles our code from a version of JS that is dev-friendly to a version
that is browser-friendly
- minify or uglifies our code so bundle size is smaller
- eliminate dead code

- [SWC](https://swc.rs/) is another bundler + transpiler + minifier
- [ESBuild](https://esbuild.github.io/)

#### Compiling
We usually use Babel for transpiling dev-friendly JavaScript (what we write) to JS that can
be executed by browsers.  When transpiling, we can provide configuration for target 
browsers that ensure we are supporting the behavior we are coding to be what our
users will experience on their browser.  Compiling or transpiling also enables
us to use modern features of latest JS.  TypeScript is another popular compiler.

#### Minifiers
This is a tool that helps us reduce the size of our files or bundles.  Usually, it removes
empty spaces, substitutes long easily readable variable and function names with shorter
names.  This can be applied to HTML, CSS, and JS.  Popular minifiers are Terser and 
Uglify.

#### Code-splitting
We can have one bundle for our application code, but this can affect the performance of
our application as this can get pretty big.  This is an issue because our application
can take time to load because the browser has to wait to complete downloading our 
bundle, process it, and then execute it.  There are mobile users that may be 
working with slower networks which leads to bad user experience.  To solve
this, we can make use of code-splitting to generate multiple smaller chunks
of our code.  The idea is that not all our code is needed at the same time
and we can take advantage of this by loading bundles when they're actually
needed (at a later time).  With React, we have tools like `React.lazy` and
`React.Suspense` that make this pretty easy to do.  

```
import MainBanner from 'src/components/main-banner.component.js';

const SubBanner = React.lazy(() => import(
    /*webpackChunkName: "SubBanner"*/ // magic comment for Webpack ^4.3 to name the bundle "SubBanner.bundle.js" 
    'src/components/sub-banner.component.js'
));

const MainPage = () => {
    const [showSubBanner, setShowSubBanner] = React.useState(false);
    
    const onClickToggleSubBanner = () => setShowSubBanner(!showSubBanner);

    return (
        <div className='main-page-container' onClick={onClickToggleSubBanner}>
            <MainBanner />
            <React.Suspense fallback={<p>Loading...</p>}>
                {showSubBanner && (<SubBanner />)}
            </React.Suspense>
        </div>
    );
}

export default MainPage;
```

`SubBanner` bundle will be fetched after the user clicks on the `.main-page-container` div.  This is an example of
`import on user interaction`.  The other way is to import the component when the parent component or another
component comes into view.  This would be called, `import on visibility`.  We can use the `Intersection Observer API` for this, or use the convenient hook, `useInView` from `react-intersection-observer`.

#### Tree-shaking
Is a very useful part or step of bundling because it helps reduce the size of our bundle by only including the named
imports from a module or file.  Unused code or dead code can be eliminated from our final bundle.

#### Static Imports
The bundler will traverse all statically imported module and include each in the generated bundle. When the component is
statically imported, it is instantly available to the user.  These are statically analyzed and tree-shaken.

#### Dynamic Imports
This is the basis for code-splitting or bundle-splitting.  We want to be able to defer loading of component code when it
is actually needed and not be part of the initial load, so the application loads quicker.  Why load code that may not be
used at all?  Dynamic imports should be used for components that are not visible during the initial render, otherwise
the user experience could be affected as there could be layout shifts or there's some delay in loading the deferred
component.  We can help avoid layout shifts by making our `fallback` component be the same size, if we know this.

Three ways we can dynamically import a component:
- `import on user interaction`: a component code can be fetched and loaded after the user clicks or hovers on a component
- `import on visibility`: a component code can be fetched and loaded after the section or area of the page is viewable;
we can use `Intersection Observer API` or the `useInView` hook from `react-intersection-observer`
- `route-based splitting/loading`: using `React.lazy` and `React.Suspense`, or with `Next.js` configuration, we can 
generate bundles based on each page of our application, this way when the user navigates to a page, we can then 
fetch the bundle

#### Browser Hints

These are directives that we can give the browser so it can optimize loading resources.
These improve our app's performance because this gives us a way to let the browser
know which resources need to be prioritized in terms of fetching.

Resources can be scripts, images, or styles.  These directives can improve speed and responsiveness of our web applications.

##### `prefetch`
In a `link` tag, we can set `rel-"prefetch"` so we let the browser know that when it is able to (when it's not working on anything else), it should fetch the resource, though the resource is not immediately needed. This utilizes the browser's idle time to get the resources.  These resources could be used for the next page, and so fetching 
then storing in cache will make navigating to the next page faster since it no
longer needs to wait to fetch the resources for it.

This is a low priority fetch and takes advantage of the browser's idle time and will
not block needed processing of the current page.

Prefetched resources are stored in the browser cache and has a potential to be evicted
if the cache fills up before being used.

```
<link rel="prefetch" href="./about.bundle.js" />
```

or 

```
const About = React.lazy(() => import(/*webpackPrefetch: true*/'./about.component'));
```

##### `preload`
This specifies that the resource is required for the current page and needs to be loaded, though it may not be immediately necessary for the initial render.  This
is a high-priority fetch, ensuring the resource is available as soon as it's needed.

This is used for fonts, images, videos, and scripts that are crucial for the page
but not immediately referenced in the HTML or CSS.  This fetch will block rendering
when needed.

```
<link rel="preload" href="/fonts/my-font.woff2" as="font" type="font/woff2" crossorigin="anonymous">

```

##### `dns-prefetch`
This tells the browser to do a DNS resolution for a domain.  This way when we need
a resource from the domain, we already have the IP address to connect to.  This
runs in the background and does not block loading of other resources.

This is a low-cost way of improving performance without affecting page rendering,
because it tells the browser to resolve the DNS for an external resource before
resources are requested from the domain.  This is often used for thir-party APIs,
CDNs, or analytics scripts.  Resolving the DNS early helps speed up the connection.
DNS resolution is the way we get the IP address of where the resource is hosted.

DNS resolution steps:
- DNS Lookup: the browser queries a DNS server for the IP address of the domain name
- DNS Cache Check: before going out to a DNS resolver, this checks to see if the IP address has already been cached in the operating system or local DNS
- DNS Server Query: if IP address is not cached, send a query to an ISP-provided DNS
resolver (can also be a Google DNS)
- Resolver Query: the DND resolver may need to query other DNS servers to find the 
authoritative DNS server for the domain
- IP Address Returned: once found, the IP address is returned to the browser, which then
uses it to initiate a connection to the web server

DNS resolution can introduce latency due to the DNS query and network latency.


##### `preconnect`

One step above `dns-prefetch`, this does the DNS resolution and initiates early connections to servers: DNS lookup, TCP handshake, and TLS negotiation (before any requests for resources).  We'll use this for third-party domains (CDNs or APIs) so we reduce the time it takes to create a connection with the resource host.

##### `prerender`

This fully loads and renders a page in the background.  This is the most aggressive directive we can use and most resource-intensive, because it will render the page in a hidden tab.  It's wasteful if the user never navigates to this `prerendered` page.
