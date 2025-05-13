const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../../data.json');

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  } catch (error) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

const getNextId = () => {
  const games = readData();
  return games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1;
};

const resolvers = {
  Query: {
    games: () => readData(),
    game: (_, { id }) => readData().find(game => game.id === Number(id))
  },

  Mutation: {
    addGame: (_, { input }) => {
      const games = readData();
      const newGame = {
        id: getNextId(),
        ...input
      };
      games.push(newGame);
      writeData(games);
      return newGame;
    },

    updateGame: (_, { id, input }) => {
      const games = readData();
      const index = games.findIndex(g => g.id === Number(id));
      
      if (index === -1) throw new Error('Jogo não encontrado');
      
      const updatedGame = { ...games[index], ...input };
      games[index] = updatedGame;
      writeData(games);
      return updatedGame;
    },

    deleteGame: (_, { id }) => {
      let games = readData();
      const initialLength = games.length;
      games = games.filter(g => g.id !== Number(id));
      
      if (games.length === initialLength) {
        throw new Error('Jogo não encontrado');
      }
      
      writeData(games);
      return "Jogo deletado com sucesso";
    }
  }
};

module.exports = resolvers;