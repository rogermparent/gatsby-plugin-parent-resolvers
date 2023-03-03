# :warning: This repository is outdated! :warning:

This repo was made a while ago during the Gatsby 2 days, before I learned a lot about how Gatsby's Data Layer works.

These days, I think the following fully built-in GraphQL-based solution is much more preferable than this repo:

```graphql
query ResourcesIndexQuery {
  allResourcesJson {
    nodes {
      parent {
        ... on File {
          name
        }
      }
    }
  }
}
```

In other situations, it's likely better to create a custom Node type the includes the desired field.

The repo is preserved for archival purposes.

---

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
