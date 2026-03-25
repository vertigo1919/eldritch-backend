# Hosting

Backend and frontend are currently temporarily hosted at the following addresses.

Backend: https://eldritch-backend.onrender.com  
Frontend:https://eldritch-game.netlify.app

The BE link is linked to the shared repo so any merge to `main` will trigger a redeployment for render. The FE is not linked to the shared repo so it's just a manual deployment that can be updated whenever we want. Long term you will wanto to fork the FE repo and set up continuos deployment on your own netifly instance. The game is live indefinitely because a ping hits the server every 5 minutes to keep Render and Supabase awake.

> [!IMPORTANT]
> You can already start hosting the game on your own Render, Supabase, and Netlify accounts by following the instructions below.

> [!IMPORTANT]
> Once the project is finished, please fork both repositories and configure your own Render, Supabase, and Netlify deployments.

## Supbase

1. Set up a database instance using Supabase
2. Create a Supabase account by signing up with an email address, or sign in using an existing GitHub account.
3. After logging in, create a new project from the dashboard. If there is no option to create a project, navigate to the All Projects tab in the sidebar.
4. Click the + New Project button.
5. On creating a project for the first time, there may be a prompt to create a new organisation. Give the organisation a name, although it doesn’t matter what this is called.
6. Make sure that the type of organisation selected is Personal and select the Free pricing plan option.
7. Next, give your project a name and create a database password. Copy this to the clipboard and paste it somewhere safe. This password will be required to connect the database instance and it cannot be retrieved again, only reset.

Note: The database password used here must only contain alphanumeric characters. Not doing so can lead to connection errors and prevent seeding to our hosted database from happening successfully as dotenv may not be able to parse the connection string properly.

8. Select any region. This will be the location of the hosted server, so it may be beneficial to choose the location closest to you.
9. Confirm to create the project.
10. If any of these settings need to be changed later they can be reset in the Project Settings dashboard (including the database password).
11. Now that the database instance has been created, navigate back to Home using the menu on the left of the screen.
12. Click the Connect button in the top bar corner located next to your project name. There's a little icon of a plug next to it.
    Copy the Transaction pooler URI connection string to your clipboard, and/or keep this tab open while you move on to the next step. It will look something like this: postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-eu-west-2.pooler.supabase.com:6543/postgres.

## Create env files

### .env

13. Create a .env file

```
PORT=3000
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://localhost/eldritch
PGDATABASE=eldritch
```

### .env.development

14. Create an env.development file

```
PGDATABASE=eldritch
```

### .env.production

15. Create an env.production file. In this file, create a variable of DATABASE_URL with value of the URL connection string that was copied from the database configuration in step 12.
16. Make sure to paste in the database password from earlier where directed in the connection string, removing the square brackets too.

## Seed remote database

17. Run npm run seed-remote

## Render

18. Sign up to Render. Then, click on the New + button and create a new Web Service.
19. If you are using our shraed backed end repo paste the URL of the public repo, if you've forked it you can use your githib account and select the repo.
20. Give the app a name.
21. Most of the other options can be left on the default settings, meaning the app will be hosted in the EU using the main branch.
22. The default build command should be `npm install` and the default start command should be `npm start`.
23. Near bottom, underneath the payment tier options, provide the following environment variables as separate inputs within the Environment Variables section.

    Set DATABASE_URL to the URL of the database from Supabase (the same as in the .env.production file).
    Set NODE_ENV to production.

24. Create the service and it will begin the deploy process. This will take a few minutes the first time, so be patient. Progress for this can be seen by selecting the Events tab followed by Logs. Make a note of the webservice URL.

## Betterstack

25. Create a betterstack.com account
26. Create a new monitor with the following settings:

- Alert us when: URL returns HTTP status other than 200
- URL to monitor: [render.com web service URL]/ping - see URL from step 24.

## Netifly

To host the front end you will need to:

27. Create a netifly account
28. Make sure to have created a clone or a fork of the FE repo
29. Add a netifly enviroment variable: VITE_SERVER_URL= [your-deployed-render.com-address]
30. Connect to your github account and select the FE rep
31. Deploy on netifly
32. Add to your render.com backend and env variable name: `CLIENT_URL` and value: `[your-deployed-netifly-address]`
33. Alternatively instead of 29 you can create a local .env.production in your local FE repo with the env variable, then build locally and push to netifly via command line.
