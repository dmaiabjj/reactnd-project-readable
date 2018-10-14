const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1538352601,
    title: 'Udacity is the best place to learn React',
    body: `Não obstante, a crescente influência da mídia garante a contribuição de um grupo importante na determinação das condições financeiras e administrativas exigidas. Por outro lado, o comprometimento entre as equipes pode nos levar a considerar a reestruturação das diretrizes de desenvolvimento para o futuro. Assim mesmo, o entendimento das metas propostas agrega valor ao estabelecimento do sistema de participação geral. No mundo atual, a constante divulgação das informações promove a alavancagem dos modos de operação convencionais. 
    Percebemos, cada vez mais, que o acompanhamento das preferências de consumo obstaculiza a apreciação da importância da gestão inovadora da qual fazemos parte. Todavia, o desenvolvimento contínuo de distintas formas de atuação assume importantes posições no estabelecimento das direções preferenciais no sentido do progresso. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a execução dos pontos do programa facilita a criação do remanejamento dos quadros funcionais. Gostaria de enfatizar que a percepção das dificuldades nos obriga à análise dos índices pretendidos. 

    No entanto, não podemos esquecer que a adoção de políticas descentralizadoras oferece uma interessante oportunidade para verificação dos paradigmas corporativos. O empenho em analisar o julgamento imparcial das eventualidades acarreta um processo de reformulação e modernização do impacto na agilidade decisória. A nível organizacional, o desafiador cenário globalizado representa uma abertura para a melhoria de todos os recursos funcionais envolvidos. Por conseguinte, o início da atividade geral de formação de atitudes prepara-nos para enfrentar situações atípicas decorrentes dos relacionamentos verticais entre as hierarquias. 

    Pensando mais a longo prazo, o fenômeno da Internet estende o alcance e a importância das condições inegavelmente apropriadas. Evidentemente, a hegemonia do ambiente político maximiza as possibilidades por conta do processo de comunicação como um todo. Ainda assim, existem dúvidas a respeito de como a expansão dos mercados mundiais talvez venha a ressaltar a relatividade do orçamento setorial. 

    Do mesmo modo, a consulta aos diversos militantes aponta para a melhoria dos níveis de motivação departamental. Acima de tudo, é fundamental ressaltar que a estrutura atual da organização afeta positivamente a correta previsão do retorno esperado a longo prazo. Neste sentido, o novo modelo estrutural aqui preconizado cumpre um papel essencial na formulação das posturas dos órgãos dirigentes com relação às suas atribuições. 

    É importante questionar o quanto a competitividade nas transações comerciais é uma das consequências de alternativas às soluções ortodoxas. Podemos já vislumbrar o modo pelo qual o surgimento do comércio virtual causa impacto indireto na reavaliação das formas de ação. O cuidado em identificar pontos críticos na necessidade de renovação processual não pode mais se dissociar dos procedimentos normalmente adotados. Desta maneira, a revolução dos costumes possibilita uma melhor visão global do sistema de formação de quadros que corresponde às necessidades. 
`,
    author: 'Udacity',
    category: 'react',
    votes:[{name: 'thingtwo',option: 'upVote',value: 1},{name: 'carlos',option: 'downVote',value: -1}],
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1535760601,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    votes:[],
    deleted: false,
    commentCount: 0
  },
  "61636364": {
    id: '61636364',
    timestamp: 1533082201,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'Udacity',
    category: 'redux',
    votes:[],
    deleted: false,
    commentCount: 0
  },
  "6163636": {
    id: '6163636',
    timestamp: 1530403801,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    votes:[],
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      votes: [],
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id,user, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]

    function checkVote(votes,vote) {
      const previous = votes.find((v) => v.user === vote.user)
      if(previous === undefined)
        return votes.concat([vote])
      if(previous.option === vote.option)
        return votes.filter((v) => v.user !== vote.user)
      else
        return votes.filter((v) => v.user !== vote.user).concat([vote])

    }

    switch(option) {
      case "upVote":
          post.votes = checkVote(post.votes,{user,option,value: 1})
          break
      case "downVote":
          post.votes = checkVote(post.votes,{user,option,value: -1})
          break
      default:
          console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    console.log(post)
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token,post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[post.id][prop] = post[prop]
        }
        res(posts[post.id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
