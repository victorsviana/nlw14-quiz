const perguntas = [
    {
        pergunta: 'O que é JavaScript?',
        respostas: [
            'Uma linguagem de programação para estilos de páginas web',
            'Uma linguagem de programação para criação de animações em vídeos',
            'Uma linguagem de programação para desenvolvimento web interativo'
        ],
        correta: 2
    },
    {
        pergunta: 'Qual é a função do operador "+" em JavaScript?',
        respostas: [
            'Concatenar strings e adicionar números',
            'Subtrair números e dividir strings',
            'Multiplicar strings e dividir números'
        ],
        correta: 0
    },
    {
        pergunta: 'Como se declara uma variável em JavaScript?',
        respostas: [
            'var',
            'let',
            'both var and let'
        ],
        correta: 2
    },
    {
        pergunta: 'Qual é a sintaxe correta para um comentário de uma única linha em JavaScript?',
        respostas: [
            '// Este é um comentário',
            '<!-- Este é um comentário -->',
            '/* Este é um comentário */'
        ],
        correta: 0
    },
    {
        pergunta: 'O que é uma função em JavaScript?',
        respostas: [
            'Um conjunto de instruções que executam uma tarefa específica',
            'Um tipo de variável que armazena valores',
            'Um operador que compara valores'
        ],
        correta: 0
    },
    {
        pergunta: 'Como se chama o processo de juntar dois ou mais strings em JavaScript?',
        respostas: [
            'Concatenação',
            'Agregação',
            'Associação'
        ],
        correta: 0
    },
    {
        pergunta: 'O que é um loop em JavaScript?',
        respostas: [
            'Um tipo de erro de sintaxe',
            'Uma estrutura de controle que repete um bloco de código',
            'Um tipo de variável que armazena uma sequência de valores'
        ],
        correta: 1
    },
    {
        pergunta: 'Qual é a função do método "querySelector" em JavaScript?',
        respostas: [
            'Selecionar elementos de uma página HTML por sua classe',
            'Selecionar elementos de uma página HTML por sua ID',
            'Selecionar o primeiro elemento que corresponde a um seletor CSS especificado'
        ],
        correta: 2
    },
    {
        pergunta: 'O que é um array em JavaScript?',
        respostas: [
            'Uma estrutura de dados que armazena uma coleção ordenada de elementos',
            'Um tipo de variável que armazena apenas um valor',
            'Um método para agrupar elementos HTML'
        ],
        correta: 0
    },
    {
        pergunta: 'Qual é a função do método "addEventListener" em JavaScript?',
        respostas: [
            'Remover um evento de um elemento HTML',
            'Adicionar um evento a um elemento HTML',
            'Selecionar um elemento HTML por sua classe'
        ],
        correta: 1
    }
];

const quiz = document.querySelector('#quiz');
// Seleciona a teg template e armazena em uma variável
const template = document.querySelector('template');
// Armazena informações sem repetir
const corretas = new Set();

const totalDePerguntas = perguntas.length;
const mostrarTotal = document.querySelector('#acertos span')


for (const item of perguntas) {
    // Clona o conteúdo da tag template. O parâmetro 'true' habilita a cópia de todos os itens filhos dessa tag
    const quizItem = template.content.cloneNode(true);
    
    // Busca a tag h3 e insere o texto que está no array de perguntas (cada pergunta por vez)
    quizItem.querySelector('h3').textContent = item.pergunta;
    
    // Loop para percorrer as 3 respostas do array de respostas
    for (let resposta of item.respostas) {
        //Seleciona o dt que é filho de dl e clona a estrutura HTML, incluindo as tags filhos
        const dt = quizItem.querySelector('dl dt').cloneNode('true');
        //Insere no span cada respotas do array de respotas
        dt.querySelector('span').textContent = resposta;
        // Seleciona o input e muda o atributo 'name' para 'pergunta-(índice do elemento)'
        dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item));
        // Altera o value para cada item de resposta
        dt.querySelector('input').value = item.respostas.indexOf(resposta);
        //
        dt.querySelector('input').onchange = (event) => {
            const estaCorreta =  event.target.value == item.correta;
            corretas.delete(item);
            
            if(estaCorreta){
                corretas.add(item);
            }
            
            mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas;
        }

        // Insere na tag 'dl' o conteúdo da variável dt
        quizItem.querySelector('dl').appendChild(dt);
    }

    // Remove a primeira opção de respotas para não ficar uma resposta vazia na tela
    quizItem.querySelector('dl dt').remove();

    // Adiciona o item do quiz na div#quiz
    quiz.appendChild(quizItem);
}