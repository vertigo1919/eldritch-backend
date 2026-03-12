## **MVP Spec**

### **Goal**

Build a real-time 4-player quiz combat prototype where all players answer the same question simultaneously and the team wins or loses based on shared HP.

---

## **Player Flow**

1. Enter **Name** \+ **Room Code**

2. Join **Lobby** (max 4 players)

3. Start game

4. Battle loop:
   - Show **Monster HP** and **Team HP**

   - Show **Question \+ 4 answers**

   - Players submit an answer

   - Round resolves simultaneously

5. End:
   - **Victory** if monster HP reaches 0

   - **Game Over** if team HP reaches 0

---

## **Core Rules**

- Room size: **1–4 players**

- Shared Team HP: single pool for the whole room

- Each round uses the same question for all players

- Round timer: **10–15 seconds**
  - No answer \= wrong

- Next round begins with a new question until game ends

---

## **Backend Deliverables**

- Socket server with:
  - Create/join room by room code

  - Max 4 players enforcement

  - Lobby state broadcast (players list)

  - Start game event

- Round timer \+ auto-resolve

- Broadcast state updates to all clients after:
  - join/leave

  - start

  - answer received

  - round resolution

  - game end

- Content source:
  - Question bank (seed JSON or DB table)

  - Single monster config (DB)
  - Character database
  - Item database

---

## **Frontend Deliverables**

- Screens:
  - Join (name, room code)

  - Lobby (player list, start)

  - Battle (HP bars, question, answers, waiting, result)

  - Victory

  - Game Over

- Battle UI requirements:
  - Display Monster HP bar

  - Display Team HP bar

  - Display question \+ 4 buttons

  - Disable buttons after submission

  - Show “waiting for others / resolving”

  - Show round result: `R correct / W wrong`

- Network:
  - Send: join, start, answer

  - Receive: lobby updates, battle state updates, game end

---

## **Design Deliverables**

- Single consistent UI style:
  - Panel style for question/answers

  - Button style with hover/pressed

  - HP bar style

- Minimal assets:
  - 1 background

  - 1 monster image

  - Basic UI icons optional

---

## **Definition of Done**

- 4 clients can join the same room and see each other in lobby

- Game starts and all clients see the same question

- Answers resolve simultaneously with correct HP changes

- Game ends with Victory or Game Over and all clients transition correctly
