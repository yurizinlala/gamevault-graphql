const { gql } = require('apollo-server');

const typeDefs = gql`
  type Game {
    id: ID!
    title: String!
    developer: String!
    genre: String!
    releaseYear: Int!
    platform: [String]!
    rating: Float!
    status: String!
  }

  input GameInput {
    title: String!
    developer: String!
    genre: String!
    releaseYear: Int!
    platform: [String]!
    rating: Float!
    status: String!
  }

  type Query {
    games: [Game!]!
    game(id: ID!): Game
  }

  type Mutation {
    addGame(input: GameInput!): Game!
    updateGame(id: ID!, input: GameInput!): Game!
    deleteGame(id: ID!): String!
  }
`;

module.exports = typeDefs;