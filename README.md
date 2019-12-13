# Gatsby plugin: Parent Resolvers - Monorepo

Hi! This repo is for developing `gatsby-plugin-parent-resolvers`.

You can find the plugin's documentation in its subdirectory.

## Getting started

### Install

This monorepo uses Yarn workspaces. It may work with other solutions, but I can't guarantee it.

```bash
git clone https://github.com/rogermparent/gatsby-plugin-parent-resolvers.git
cd gatsby-plugin-parent-resolvers
yarn
```

### Run example

```bash
cd example
gatsby develop
```

And then open the GraphIQL instance at `localhost:8000/___graphql`

Try out this query to hit all example fields:

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

Check out `gatsby-node.js` for how these are implemented!
