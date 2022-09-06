# api_parrot

primeiro: npm install 

1 - Clonar o projeto em sua máquina;</br> 2 - Executar no terminal: npm install;</br> 3 - Criar um arquivo na raiz do projeto com o nome ".env", com o seguinte conteúdo (substitua pelas suas informações sem as aspas):</br>   DB_USER="nome do seu usuario no mysql"</br>   DB_PWD="senha do seu usuario"</br>   DB_NAME="nome que voce quer dar para o banco de dados"</br>   DB_HOST="local onde está rodando o servidor, para servidor local usar localhost"</br>   DB_PORT="porta utilizada"</br>   DB_DIALECT="qual é o banco de dados? nosso caso mysql"</br>   NODE_ENV=development</br>


para criar as migrations: npm run migration:generate

para rodar as migrations: npm run migration:run

para rodar a seeders: npm run seed
