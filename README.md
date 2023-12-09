# Hangman Client

## Description

This is a client for the Hangman App. It is built with Next.js and uses Tauri to make it a downloadable application. The client is designed to be used on the web and as a downloadable application. Unfortunately, the server is not deployed on the web so the app can only be used locally. Thus not as an application and not on the web. If the server would be deployed on the web, the app would be able to be used as a downloadable application and also on the web. Unfortunately, this is not the case. (The reason why the downloadable application does not work with a local server is because of security reasons.)

```bash
npm run tauri dev
```

## How to run the client

1. So before running the client, we will need to `run the server locally` if you haven't already. To do this, you will have to follow the instructions in the README.md file in the server repository. The server repository can be found [here](https://github.com/GuustTaillieu/Hangman-App-server)

2. After running the server, we will need to `download the client`. This can be done by clicking on the green button that says "Code" and then clicking on "Download ZIP".

3. After downloading the client, we will need to `unzip the file`.

4. After unzipping the file, we will need to `open the terminal and navigate to the folder where the client is located`. This can be done by typing the following command in the terminal:

```bash
cd path/to/the/client

(Example: cd C:\Users\{user}\Downloads\hangman-app-client)
```

5. After navigating to the folder where the client is located, we will need to run the client. This can be done by typing the following command in the terminal:

```bash
npm run tauri dev
```

## Playing the game

After running the client, you will be able to play the game with as many players as you want.
To test this, open the client in multiple browsers (see below), as well as the running preview of the client in the Tauri app. (The one you just ran with the command `npm run tauri dev`)
To open the game in a browser, you will need to open the following link in the browser: [http://localhost:3000/](http://localhost:3000/)
This will also be shown in the terminal after running the client.

## The game

The game speaks for itself. It has all the rules of the original Hangman game you probably already know.
The only difference is that you can play it with as many players as you want. (As long as you have enough devices/browser to play it on)

1. Choose a username to join the server.
2. Choose an already existing room or create a new one.
3. Wait for the other players to join the room.
4. Start the game (only the host can do this).
5. Give up a word for the other players to guess.
6. Start the game!

### The rules

1. The game starts with a word that is hidden by dashes. The amount of dashes is equal to the amount of letters in the word.
2. The players can guess a letter. If the letter is in the word, the dashes will be replaced by the letter.
3. If the letter is not in the word, the player will lose a life. (This is represented by the hangman drawing that will be drawn on the screen little by little)
4. If the player loses all his lives (10), he will lose a point. The lives will be reset every round.
5. If the player guesses the word before losing all his lives, he will earn a point.
6. The game ends when all the words are guessed.
7. Restart the game to play again. Other players can join the room at any time.
