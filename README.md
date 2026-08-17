# Music Twins

Uma aplicação web para comparar os hábitos musicais de dois usuários do Last.fm.

O projeto utiliza a API do Last.fm para buscar os dados dos usuários, processa essas informações e apresenta uma comparação visual entre seus hábitos de escuta.

## Preview



## Funcionalidades

- Comparação entre dois usuários do Last.fm
- Consulta de dados através da Last.fm API
- Exibição de perfil, avatar e estatísticas de cada usuário
- Comparação de:
  - Scrobbles
  - Artistas
  - Tracks
- Requisições simultâneas utilizando `forkJoin`
- Tratamento e transformação dos dados da API
- Interface responsiva

## Tecnologias

- Angular
- TypeScript
- RxJS
- SCSS
- Reactive Forms
- Last.fm API

## Arquitetura

O projeto utiliza uma organização baseada em **features**, separando responsabilidades entre páginas, componentes, services e models.

```text
src/app/
├── core/
├── layouts/
│   └── main-layout/
├── features/
│   └── comparison/
│       ├── components/
│       │   ├── comparison-form/
│       │   ├── comparison-results/
│       │   └── user-profile/
│       ├── models/
│       ├── pages/
│       │   └── comparison-page/
│       └── services/
└── app.routes.ts