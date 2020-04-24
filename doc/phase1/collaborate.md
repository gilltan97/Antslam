# Collaboration

We will base our collaboration on Scrum, and will be using Github Projects to organize our work

## Sprint Retro and Planning

Bi-Weekly Sprint Planning

### Retro

Friday

Run demo of completed work

We run the application on `dev`, if it works we merge with master

Go over what has went well, what can be improved, and what new practices can be implemented for the upcoming sprint

### Planning

Monday

The goal of planning is to go over tasks from the previous sprint, and move them to the new sprint if necessary

Create tasks for the new sprint

Estimate task difficulty

Assign tasks to developers

## Project Flow

Each Sprint will have a new Project

All new Tasks will start in the `ToDo` column

Once a developer starts work on a task, they move it to the `In Progress` Column

Once the assigned developer merges all related PRs for the task to implement it, they move the task to the `Done` column

## Roles

The Scrum Master will change each sprint, currently it is `Musa`, their role is to check over the Project, ensure that everyone is assigned tasks, that the project flow is being followed, and help alleviate any blockers

The Product Owner is `Musa`, their role is to have a deep understanding of the product we are building, to guide decisions on what we implement, and act as a "voice of the customer"

- Frontend: Alex, Amr, Lana, Nikita
- Backend: Shoaib, Tanveer (dockerization), Lana, Musa
- DevOps: Musa, Tanveer, Amr
- Test & User feedback: Alex, Shoaib

# Git Flow 

The collaboration will be based on a simplified version of the Gitflow workflow, you can read more about it here https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow 

## Features

Whenever we work on a new Feature ( new endpoint, new piece of the UI, etc.) we will follow this flow

### Creating a Feature Branch

Create a new branch from `dev`, name it `feature/<your-feature-name>`

`git checkout dev`

`git checkout -b feature/pie-factory`

### Committing changes

`git commit -m "Your Message Here"`

### Pull Requests

Once you have completed your feature, create a Pull Request from `feature/<your-feature-name>-<issue-id>` to `dev`

Add a description of what changes you made

Add instructions on how to test your changes, and what is the expected result.

Ask for a review from the team, and get at least two approving reviews before merging your changes.

Do Not merge other people's PRs, the creator of the PR should be the one to merge it, in case they realised they have any changes they still need to make.

## Fixes and Docs

When you are fixing a bug, create a `fix/<fix-name>-<issue-id>` branch, follow steps similar to Feature Branch

When you are updating docs, create a `doc/<name>` branch, follow steps similar to Feature Branch