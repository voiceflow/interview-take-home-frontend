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

Login/sign up for [Voiceflow Creator](https://creator.voiceflow.com), and build a simple **Custom Assistant** project. If you need inspiration you can check out the [Templates](https://www.voiceflow.com/templates-draft). Test it out to make sure it's working!

On the **"Launch"** tab of your Voiceflow project, you'll be able to get the API keys as well as the version. Under `src/Chat/utils.ts` you'll find a utility function that shows how the API can be called. [Click here](https://www.voiceflow.com/api/dialog-manager) for more documentation on the Voiceflow API.

<img width="806" alt="Screen Shot 2021-06-21 at 11 54 39 AM" src="https://user-images.githubusercontent.com/5643574/122813195-82b12f00-d287-11eb-8424-8e6e09e1ab60.png">

Use this API to create a back and forth chat where every single new input submission generates a series of responses.

<img width="342" alt="Screen Shot 2021-06-21 at 11 59 53 AM" src="https://user-images.githubusercontent.com/5643574/122813843-492cf380-d288-11eb-8cff-69fc2225b743.png">

Along with the response you'll see that the `"type": "speak"` traces also contain Audio, so that needs to get played in sequence. (there can be multiple speak traces in a response)
<img width="1116" alt="Screen Shot 2021-06-21 at 12 35 56 PM" src="https://user-images.githubusercontent.com/5643574/122817793-3cf76500-d28d-11eb-9666-9232e6526683.png">

The goal of this app is to allow multiple users to start a chat with the bot you've made. We should be able to switch between different users and the _Chat_ section should retain the history of that particular person's chat when switching around.

For example, if I select _Steve_ and chat for a bit, I can back out and select _Luke_ and start a new conversation. When I return to _Steve_ his conversation is still there.

Right now the dashboard and chat are hard coded - but this should be all be dynamic. Feel free to add in a bit of styling as well to make it look a little better. (We're really not judging design or how pretty it is, but it's a good opportunity to show off styling code).

Feel free to modify the code as much as you want, as the template is more of a suggestion. **Use any libraries, packages, existing code - nothing is off limits.**

# Requirements

- The chat should be scrollable and go as far back as the conversation start
- Reset after a chat is finished
- The chat should play the MP3 audio if included in the `Speak` trace in the response, audio should never overlap.
- User's chat history and state should be stored even if the page refreshes
- Start with 0 users, but should be able to create new ones, and delete old ones
- Chat should always scroll to the most recent message when updated
- Set up a build to turn the Typescript project into a browser compatible JS static Single Page Application

# Tips 📝

Unless you get fancy and go off the rails (which isn't a bad thing 👍) this project takes around ~1-3 hours if you are familiar with the stack. Keep in mind this isn't a race to get it done - it's about getting it done well.

- use Typescript proficiently
- use repeatable, scalable patterns
- make modular, nicely separated components
- account for edge cases
- manage sensitive data securely
- manage data passing properly
- set up a good build process

# Submission

Send the link to your working repository to your recruiter's email.
