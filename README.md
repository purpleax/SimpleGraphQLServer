
# GraphQL Yoga Server with Purchase Simulation

This project is a simple **GraphQL Yoga** server that simulates inventory management and purchases through GraphQL queries and mutations. The server allows querying for available items in inventory and simulating a purchase request, including successful and failure scenarios.

## Features

- **GraphQL Queries**: Query available items in inventory.
- **GraphQL Mutations**: Simulate purchasing items from inventory.
- **Schema Introspection**: Introspection queries are enabled for easy exploration of the schema.
- **cURL Usage**: Interact with the server using `cURL` commands to send queries and mutations.

## Requirements

- **Node.js** (v14 or later)
- **npm** or **yarn**

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/graphql-yoga-server.git
cd graphql-yoga-server
```

### 2. Install Dependencies

Run the following command to install the required Node.js packages:

```bash
npm install
```

The main dependencies are:

- `graphql-yoga`: A lightweight GraphQL server.
- `@graphql-tools/schema`: A tool to create an executable schema from type definitions and resolvers.

### Dependencies

The following packages are automatically installed when you run `npm install`:

- `graphql-yoga`: Core library to run the GraphQL server.
- `@graphql-tools/schema`: For building the executable schema.
- `http`: Node.js core module to create an HTTP server.

### Running the Server

To start the GraphQL server, run the following command:


node server.js


The server will be running on http://localhost:4000.

## GraphQL Schema

### Type Definitions

This server has the following GraphQL type definitions:


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
```

### Resolvers

Resolvers are functions that handle the logic for GraphQL queries and mutations. Here's an overview of the resolvers used:

- **Query**:
    - `hello`: Returns a simple "Hello World!" message.
    - `inventory`: Returns the current stock of items in the inventory.
- **Mutation**:
    - `makePurchase`: Simulates purchasing an item from the inventory, decreasing the stock and returning a message indicating success or failure.

## GraphQL Queries and Mutations

### Query: Fetch Inventory

You can fetch the list of items available in the inventory using the following query:


{
  inventory {
    name
    stock
  }
}
```

### Mutation: Purchase Item

To simulate purchasing an item from the inventory, use this mutation:

graphql
mutation {
  makePurchase(itemId: "item1", quantity: 2) {
    success
    message
  }
}


### Sample Response

Here's an example response for a successful purchase:


{
  "data": {
    "makePurchase": {
      "success": true,
      "message": "Successfully purchased 2 Laptop(s)."
    }
  }
}


## cURL Example

To interact with the server using cURL, here’s an example command for making a purchase request:


curl -i -X POST http://localhost:4000/graphql \
-H "Content-Type: application/json" \
-d '{"query": "mutation { makePurchase(itemId: \"item1\", quantity: 2) { success message } }"}'


### Sample Response for cURL Request


HTTP/1.1 200 OK
Content-Type: application/graphql-response+json; charset=utf-8
Content-Length: 95
Date: Wed, 11 Sep 2024 08:00:00 GMT
Connection: keep-alive

{
  "data": {
    "makePurchase": {
      "success": true,
      "message": "Successfully purchased 2 Laptop(s)."
    }
  }
}


## Introspection Query

GraphQL introspection is enabled, allowing you to explore the schema. You can use development tools like GraphQL Playground, Postman, or GraphiQL to see the schema details. Here's an example introspection query:


{
  __schema {
    types {
      name
    }
  }
}

