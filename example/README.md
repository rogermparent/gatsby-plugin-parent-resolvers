# Example repository

This repository shows off all the functionality for `gatsby-plugin-parent-resolvers`.

It'll also be used for testing when, uh, I figure out how.

Here's an example query showing off all the fields

```graphql
query ExampleQuery {
  parentNode {
    exampleInt
    exampleString
    resolvedFromNothing
  }
  resolverChild {
    namedParentPassthrough
    namedParentResolverPassthrough
    exampleString
    resolvedFromNothing
    intWithDefault
  }
  builderExtensionChild {
    namedParentPassthrough
    namedParentResolverPassthrough
    exampleString
    resolvedFromNothing
  }
  sdlExtensionChild {
    namedParentPassthrough
    namedParentResolverPassthrough
    exampleString
    resolvedFromNothing
  }
}
```
