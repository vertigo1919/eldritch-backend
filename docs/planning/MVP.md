## **MVP Spec**

### **Goal**

Build a real-time 4-player quiz combat prototype where all players answer the same question simultaneously and the team progresses through three monsters in sequence, each using increasing question difficulty, while sharing a team HP pool.
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
   
   -   If monster HP reaches 0:
      -   Load the next monster
      -   Continue battle

5. End:
   - **Victory** if all 3 monsters are defeated

   - **Game Over** if team HP reaches 0

---

## **Core Rules**

- Room size: **1–4 players**

- Shared Team HP: single pool for the whole room

- Each round uses the same question for all players

- Questions cannot repeat within a single run.

- Round timer: **10–15 seconds**

-  No answer \= wrong

- Next round begins with a new question until game ends

- Correct answer → Monster takes damage

- Wrong answer or no answer → Team takes damage

- Round resolves when:
   - All players have submitted an answer, OR
   - The timer expires

---

### Monster Progression (MVP)

- The game includes 3 monsters preloaded in the database.
   -  Monsters are fought sequentially:
      -  Monster 1
      -  Monster 2
      -  Monster 3

    Each monster loads questions of increasing difficulty:
      - Monster 1 → Level 1 (easy) questions
      - Monster 2 → Level 2 (medium) questions
      - Monster 3 → Level 3 (hard) questions

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
  - Monster database (3 monsters for MVP with increasing difficulty)
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

  - 3 monster images

  - Basic UI icons optional

---

## **Definition of Done**

- 4 clients can join the same room and see each other in lobby

- Game starts and all clients see the same question

- Answers resolve simultaneously with correct HP changes

- Game ends with Victory or Game Over and all clients transition correctly

- Players must defeat 3 monsters in sequence to win
- Questions increase in difficulty with each monster
