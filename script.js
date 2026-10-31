// ===== ESTADO DO CARRINHO =====
let carrinho = [];

// ===== ADICIONAR AO CARRINHO =====
function addToCart(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();

  // Feedback visual no badge
  const badge = document.getElementById('cartCount');
  badge.style.transform = 'scale(1.5)';
  setTimeout(() => badge.style.transform = 'scale(1)', 200);
}

// ===== ATUALIZAR CONTADOR E TOTAL =====
function atualizarCarrinho() {
  // Contador
  document.getElementById('cartCount').textContent = carrinho.length;

  // Itens no modal
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  if (carrinho.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Carrinho vazio</p>';
    cartTotal.textContent = 'Total: R$ 0,00';
    return;
  }

  cartItems.innerHTML = carrinho.map(item => `
    <div class="cart-item">
      <span>${item.nome}</span>
      <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong>
    </div>
  `).join('');

  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
  cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// ===== ABRIR / FECHAR MODAL =====
function abrirCarrinho() {
  document.getElementById('modalCarrinho').classList.add('active');
}

function fecharCarrinho(event) {
  // Fecha se clicar no overlay ou no botão fechar
  if (!event || event.target.id === 'modalCarrinho') {
    document.getElementById('modalCarrinho').classList.remove('active');
  }
}

// ===== FINALIZAR COMPRA (simulação) =====
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
  alert(`Compra finalizada!\nTotal: R$ ${total.toFixed(2).replace('.', ',')}\n\n(Integre com WhatsApp ou gateway de pagamento aqui)`);
  
  // Limpar carrinho
  carrinho = [];
  atualizarCarrinho();
  fecharCarrinho();
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
  atualizarCarrinho();
});