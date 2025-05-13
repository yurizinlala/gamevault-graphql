const API_URL = 'http://localhost:4000';
let currentGameId = null;

// ====================== FUNÇÕES GRAPHQL ====================== //
async function executeGraphQL(query, variables = {}) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });

    const { data, errors } = await response.json();
    if (errors) throw new Error(errors[0].message);
    return data;
  } catch (error) {
    console.error('Erro GraphQL:', error);
    throw error;
  }
}

// ====================== OPERAÇÕES CRUD ====================== //
async function fetchGames() {
  try {
    const query = `
      query {
        games {
          id
          title
          developer
          genre
          releaseYear
          platform
          rating
          status
        }
      }
    `;

    const { games } = await executeGraphQL(query);
    renderGames(games);
  } catch (error) {
    showError('Falha ao carregar jogos');
  }
}

async function saveGame(gameData) {
  try {
    if (currentGameId) {
      const mutation = `
        mutation UpdateGame($id: ID!, $input: GameInput!) {
          updateGame(id: $id, input: $input) {
            id
          }
        }
      `;
      await executeGraphQL(mutation, { 
        id: currentGameId,
        input: gameData
      });
    } else {
      const mutation = `
        mutation AddGame($input: GameInput!) {
          addGame(input: $input) {
            id
          }
        }
      `;
      await executeGraphQL(mutation, { input: gameData });
    }
    
    return true;
  } catch (error) {
    showError(error.message);
    return false;
  }
}

async function deleteGame(id) {
  if (!confirm('Tem certeza que deseja excluir este jogo?')) return;

  try {
    const mutation = `
      mutation DeleteGame($id: ID!) {
        deleteGame(id: $id)
      }
    `;
    await executeGraphQL(mutation, { id });
    fetchGames();
  } catch (error) {
    showError('Falha ao excluir jogo');
  }
}

// ====================== INTERFACE DO USUÁRIO ====================== //
function toggleForm() {
  const overlay = document.getElementById('formOverlay');
  overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
  
  if (overlay.style.display === 'none') {
    resetForm();
  }
}

function resetForm() {
  document.getElementById('gameForm').reset();
  document.getElementById('gameId').value = '';
  document.getElementById('formTitle').textContent = 'Adicionar Novo Jogo';
  currentGameId = null;
}

async function loadGameForEdit(id) {
  try {
    const query = `
      query GetGame($id: ID!) {
        game(id: $id) {
          id
          title
          developer
          genre
          releaseYear
          platform
          rating
          status
        }
      }
    `;

    const { data } = await executeGraphQL(query, { id });
    const game = data.game;
    
    // Preencher formulário
    document.getElementById('gameId').value = game.id;
    document.getElementById('title').value = game.title;
    document.getElementById('developer').value = game.developer;
    document.getElementById('genre').value = game.genre;
    document.getElementById('releaseYear').value = game.releaseYear;
    document.getElementById('rating').value = game.rating;
    document.getElementById('status').value = game.status;

    // Plataformas
    document.querySelectorAll('input[name="platform"]').forEach(checkbox => {
      checkbox.checked = game.platform.includes(checkbox.value);
    });

    currentGameId = game.id;
    document.getElementById('formTitle').textContent = 'Editar Jogo';
    toggleForm();
  } catch (error) {
    showError('Falha ao carregar jogo para edição');
  }
}

function createGameCard(game) {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `
    <div class="game-header">
      <h3 class="game-title">${game.title}</h3>
      <span class="game-rating">⭐ ${game.rating}/10</span>
    </div>
    <div class="game-details">
      <p><strong>Desenvolvedora:</strong> ${game.developer}</p>
      <p><strong>Gênero:</strong> ${game.genre}</p>
      <p><strong>Ano:</strong> ${game.releaseYear}</p>
      <p><strong>Plataformas:</strong> ${game.platform.join(', ')}</p>
      <p><strong>Status:</strong> ${game.status}</p>
    </div>
    <div class="game-actions">
      <button class="btn-edit" onclick="loadGameForEdit('${game.id}')">
        <i class="fas fa-edit"></i> Editar
      </button>
      <button class="btn-delete" onclick="deleteGame('${game.id}')">
        <i class="fas fa-trash"></i> Excluir
      </button>
    </div>
  `;
  return card;
}

function renderGames(games) {
  const grid = document.getElementById('gameGrid');
  grid.innerHTML = '';
  games.forEach(game => {
    grid.appendChild(createGameCard(game));
  });
}

function showError(message) {
  alert(`Erro: ${message}`);
}

// ====================== EVENT LISTENERS ====================== //
document.getElementById('gameForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const gameData = {
    title: document.getElementById('title').value,
    developer: document.getElementById('developer').value,
    genre: document.getElementById('genre').value,
    releaseYear: parseInt(document.getElementById('releaseYear').value),
    platform: Array.from(document.querySelectorAll('input[name="platform"]:checked'))
               .map(checkbox => checkbox.value),
    rating: parseFloat(document.getElementById('rating').value),
    status: document.getElementById('status').value
  };

  const success = await saveGame(gameData);
  if (success) {
    toggleForm();
    fetchGames();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  fetchGames();
});