const { createYoga } = require('graphql-yoga');
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Simulated data
let inventory = {
  'item1': { name: 'Laptop', stock: 10 },
  'item2': { name: 'Phone', stock: 5 },
};

// Define your GraphQL schema
const typeDefs = `
  type Query {
    hello: String
    inventory: [Item]
  }

  type Item {
    name: String
    stock: Int
  }

  type PurchaseResponse {
    success: Boolean
    message: String
  }

  type Mutation {
    makePurchase(itemId: String!, quantity: Int!): PurchaseResponse
  }
`;

// Define resolvers for your schema
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    inventory: () => {
      try {
        if (!inventory) {
          throw new Error("Inventory not found");
        }
        return Object.values(inventory);
      } catch (error) {
        console.error('Error fetching inventory:', error.message);
        throw new Error('Internal server error while fetching inventory');
      }
    },
  },
  Mutation: {
    makePurchase: (_, { itemId, quantity }) => {
      try {
        const item = inventory[itemId];

        if (!item) {
          return {
            success: false,
            message: "Item not found.",
          };
        }

        if (item.stock < quantity) {
          return {
            success: false,
            message: `Not enough stock for ${item.name}. Only ${item.stock} left.`,
          };
        }

        item.stock -= quantity;

        return {
          success: true,
          message: `Successfully purchased ${quantity} ${item.name}(s).`,
        };
      } catch (error) {
        console.error('Error processing purchase:', error.message);
        return {
          success: false,
          message: "Internal server error: " + error.message,
        };
      }
    },
  },
};

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create the Yoga server
const yoga = createYoga({
  schema,  // Pass the schema directly
  maskedErrors: false,  // Enable detailed error reporting
});

// Create the HTTP server
const server = createServer(yoga);

// Start the server
server.listen(4000, () => {
  console.log('GraphQL server is running on http://localhost:4000');
});
