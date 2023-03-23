# notion-recurring-tasks

JavaScript script that automatically adjusts the due and start date of a recurring [notion](https://www.notion.so/) task. The script can be executed with [Node.js](https://nodejs.org/en) and can be deployed in a [Docker](https://www.docker.com/) container.

## Project setup
```
docker build -t image .
docker run -it image
```

To get access to your notion database, create a secret at the official [notion API website](https://developers.notion.com/). Specify your database ID and the secret in the *.env* file.