# Voiceflow Interview Frontend Project 💬

Welcome to Voiceflow's Frontend Project!

Congrats on making it to this part of the interview process. 🥳

The goal of this project is to create a chat client that allows multiple users to interface with a Voiceflow project.

It’ll help you gain a much better understanding of how conversational interfaces work and how Voiceflow plugs into that flow.

## Setup 📦

Make sure you have [Node.js](https://nodejs.org/) and [yarn](https://yarnpkg.com/) on your computer.

Fork this repository.

> to install all dependencies (node_modules) :

```
yarn install
```

> to start the server on http://localhost:3000 :

```
yarn start
```

_if your http://localhost automatically resolves to https://localhost - try on incognito mode or a different browser_

Go on http://localhost:3000, you should see a window like this:
<img width="350" alt="Screen Shot 2021-06-21 at 12 59 27 AM" src="https://user-images.githubusercontent.com/5643574/122727590-0b9a7d00-d22c-11eb-9c1b-ebf0363ef772.png">

# Overview ℹ️

Login/sign up for [Voiceflow Creator](https://creator.voiceflow.com), and build a simple **Custom Assistant** project. If you need inspiration you can check out the [Templates Workspace](https://creator.voiceflow.com/workspace/D8nag5Vko2). Test it out to make sure it's working!

On the **"Launch"** tab of your Voiceflow project, you'll be able to get the API keys as well as the version. Under `src/Chat/utils.ts` you'll find a utility function that shows how the API can be called. [Click here](https://www.voiceflow.com/api/dialog-manager) for more documentation on the Voiceflow API.

The goal of this app is to allow multiple users to start a chat with the bot you've made. We should be able to switch between different users and the _Chat_ section should retain the history of that particular person's chat when switching around.

For example, if I select _Steve_ and chat for a bit, I can back out and select _Luke_ and start a new conversation. When I return to _Steve_ his conversation is still there.

Right now the dashboard and chat are hard coded - but this should be all be dynamic. Feel free to add in a tiny bit of styling as well to make it look a little better. (We're not judging design, but it's a good opportunity to show off styling code).

Feel free to modify the code as much as you want - the template is more of a suggestion.

# Requirements

- The chat should be scrollable and contain the entire history.
- The chat should play the MP3 audio if included in the `Speak` trace in the response
- User's chat history and state should be stored even if the page refreshes
- Set up a build to turn the Typescript project into a browser compatiable JS static Single Page Application
- Start with 0 users, but should be able to create new ones, and delete old ones
- Chat should always scroll to the most recent message when updated

# Tips 📝

Unless you get fancy and go off the rails (which isn't a bad thing 👍) this project takes around ~1-3 hours if you are familiar with the stack. Keep in mind this isn't a race to get it done - it's about getting it done well.

- use Typescript proficiently
- use repeatable, scalable patterns
- make modular, nicely separated comopnents
- account for edge cases
- manage sensitive data securely
- manage data passing properly
- set up a good build process

# Submission

Send the link to your working repository to your recruiter's email.
