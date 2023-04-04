let usuarios = [];
let lista_container = document.getElementsByClassName('lista-container');
let footers = document.getElementsByTagName('footer');
if (localStorage.getItem('cadastrados')) {
  usuarios = JSON.parse(localStorage.getItem('cadastrados'));
  cria_tabela();
}

function add() {
  let usuario = captura_nome();
  if (valida_caracteres(usuario)) {
    if (procura_usuarios(usuario.nome) == -1) {
      usuarios.push(usuario);
      localStorage.setItem('cadastrados', JSON.stringify(usuarios));
      location.reload();
    } else {
      popup_duplicata();
    }
  }
}

function captura_nome() {
  let nome = document.getElementById('nome').value;
  let usuario = { nome: nome.toLowerCase().trim() };
  return usuario;
}

function valida_caracteres(usuario) {
  if (usuario.nome.length > 2 && usuario.nome.trim().lenght != 0) {
    return true;
  } else {
    return false;
  }
}
function procura_usuarios(nome) {
  let index = usuarios.findIndex((elemento) => {
    return elemento.nome == nome;
  });
  return index;
}

function popup_duplicata() {
  let div = document.createElement('div');
  div.className = `popup`;
  document.body.append(div);
  setTimeout(() => {
    document.body.lastChild.remove();
  }, 3000);
}

function cria_tabela() {
  usuarios.forEach((elemento, index) => {
    let aluno = document.createElement('div');
    aluno.className = 'aluno';
    let ordem = document.createElement('p');
    ordem.className = `ordem`;
    ordem.innerHTML = `${index + 1}`;
    let nome = document.createElement('p');
    nome.className = `nome`;
    nome.innerHTML = `${elemento.nome}`;
    let apagar = document.createElement('p');
    apagar.className = `apagar`;
    apagar.innerHTML = `X`;
    aluno.append(ordem);
    aluno.append(nome);
    aluno.append(apagar);
    lista_container[0].append(aluno);
    apagar_usuario(apagar, elemento.nome);
  });
}
function apagar_usuario(apagar, nome) {
  apagar.addEventListener('click', () => {
    let i = procura_usuarios(nome);
    let foi = usuarios.splice(i, 1);
    localStorage.setItem('cadastrados', JSON.stringify(usuarios));
    location.reload();
  });
}
/* <p id="ordem">#3</p>
          <p id="nome">Marlon</p>
          <button id="apagar">X</button> */
