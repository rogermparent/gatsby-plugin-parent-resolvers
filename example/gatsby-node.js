const {
  parentPassthrough,
  parentResolverPassthrough,
} = require(`gatsby-plugin-parent-resolvers`)
const crypto = require(`crypto`)

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  createTypes([
    schema.buildObjectType({
      name: `ParentNode`,
      fields: {
        id: { type: `ID!` },
        resolvedFromNothing: {
          type: "String!",
          resolve() {
            return "resolved"
          },
        },
      },
      interfaces: [`Node`],
    }),
    schema.buildObjectType({
      name: `ResolverChild`,
      fields: {
        id: { type: `ID!` },
        namedParentPassthrough: {
          type: "String!",
          resolve: parentPassthrough({ field: "exampleString" }),
        },
        namedParentResolverPassthrough: {
          type: "String!",
          resolve: parentResolverPassthrough({ field: "resolvedFromNothing" }),
        },
        exampleString: { type: "String!", resolve: parentPassthrough() },
        resolvedFromNothing: {
          type: "String!",
          resolve: parentResolverPassthrough(),
        },
        intWithDefault: {
          type: "Int!",
          resolve: parentPassthrough({
            defaultValue: 42,
          }),
        },
      },
      interfaces: [`Node`],
    }),
    schema.buildObjectType({
      name: `BuilderExtensionChild`,
      fields: {
        id: { type: `ID!` },
        namedParentPassthrough: {
          type: "String!",
          extensions: {
            parentPassthrough: {
              field: "exampleString",
            },
          },
        },
        namedParentResolverPassthrough: {
          type: "String!",
          extensions: {
            parentResolverPassthrough: {
              field: "resolvedFromNothing",
            },
          },
        },
        exampleString: {
          type: "String!",
          extensions: {
            parentPassthrough: {},
          },
        },
        resolvedFromNothing: {
          type: "String!",
          extensions: {
            parentResolverPassthrough: {},
          },
        },
      },
      interfaces: [`Node`],
    }),
    `type SDLExtensionChild implements Node {
      namedParentPassthrough: String! @parentPassthrough(field: "exampleString")
      namedParentResolverPassthrough: String! @parentResolverPassthrough(field: "resolvedFromNothing")
      exampleString: String! @parentPassthrough
      resolvedFromNothing: String! @parentResolverPassthrough
    }`,
  ])
}

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { getNode, createNode, createParentChildLink } = actions

  const parentFields = {
    exampleInt: 151,
    exampleString: "Example String",
  }

  const parentNode = {
    ...parentFields,
    id: createNodeId(`ParentNode`),
    children: [],
    internal: {
      type: `ParentNode`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(parentFields))
        .digest(`hex`),
    },
  }

  createNode(parentNode)

  const resolverChild = {
    id: createNodeId(`ResolverChildNode`),
    children: [],
    parent: parentNode.id,
    internal: {
      type: `ResolverChild`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(parentNode.id))
        .digest(`hex`),
    },
  }
  createNode(resolverChild)
  createParentChildLink({ parent: parentNode, child: resolverChild })

  const sdlExtensionChild = {
    id: createNodeId(`sdlExtensionChildNode`),
    children: [],
    parent: parentNode.id,
    internal: {
      type: `SDLExtensionChild`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(parentNode.id))
        .digest(`hex`),
    },
  }
  createNode(sdlExtensionChild)
  createParentChildLink({ parent: parentNode, child: sdlExtensionChild })

  const builderExtensionChild = {
    id: createNodeId(`builderExtensionChildNode`),
    children: [],
    parent: parentNode.id,
    internal: {
      type: `BuilderExtensionChild`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(parentNode.id))
        .digest(`hex`),
    },
  }
  createNode(builderExtensionChild)
  createParentChildLink({ parent: parentNode, child: builderExtensionChild })
}
