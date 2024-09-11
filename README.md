markdown

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

git clone https://github.com/yourusername/graphql-yoga-server.git
cd graphql-yoga-server

2. Install Dependencies

Run the following command to install the required Node.js packages:

npm install

The main dependencies are:

    graphql-yoga: A lightweight GraphQL server.
    @graphql-tools/schema: A tool to create an executable schema from type definitions and resolvers.

Dependencies

The following packages are automatically installed when you run npm install:

npm install graphql-yoga @graphql-tools/schema

    graphql-yoga: Core library to run the GraphQL server.
    @graphql-tools/schema: For building the executable schema.
    http: Node.js core module to create an HTTP server.

Running the Server

To start the GraphQL server, run the following command:

node server.js

The server will be running on http://localhost:4000.
GraphQL Schema
Type Definitions

This server has the following GraphQL type definitions:

graphql

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


Query: Fetch Inventory

You can fetch the list of items available in the inventory using the following query:

graphql

{
  inventory {
    name
    stock
  }
}

Mutation: Purchase Item

To simulate purchasing an item from the inventory, use this mutation:

graphql

mutation {
  makePurchase(itemId: "item1", quantity: 2) {
    success
    message
  }
}

Sample Response

Here's an example response for a successful purchase:

json

{
  "data": {
    "makePurchase": {
      "success": true,
      "message": "Successfully purchased 2 Laptop(s)."
   

