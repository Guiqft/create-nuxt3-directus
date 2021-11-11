#!/usr/bin/env node
import * as fs from "fs"
import * as path from "path"
import * as inquirer from "inquirer"
import * as yargs from "yargs"
import { createDirectoryContents, createProject, CURR_DIR } from "./utils"

const CHOICES = fs.readdirSync(path.join(__dirname, "../templates"))
const QUESTIONS = [
    {
        name: "template",
        type: "list",
        message: "What project template would you like to generate?",
        choices: CHOICES,
    },
    {
        name: "name",
        type: "input",
        message: "Project name:",
        when: () => !yargs.argv["name"],
    },
]

inquirer.prompt(QUESTIONS).then((answers) => {
    //merging command line arguments with user’s answers.
    answers = Object.assign({}, answers, yargs.argv)

    const projectChoice = answers["template"]
    const projectName = answers["name"]

    const templatePath = path.join(__dirname, "../templates", projectChoice)
    const targetPath = path.join(CURR_DIR, projectName)

    if (!createProject(targetPath)) {
        return
    }

    createDirectoryContents(templatePath, projectName)

    // Show neet steps
    console.log(
        `\n 🎉  Sucess on project creation! Next steps:` +
            [
                "",
                `📁  \`cd ${path.relative(CURR_DIR, targetPath)}\``,
                "💿  Install dependencies with `yarn install`",
                "🚀  Start development server with `yarn dev`",
                "",
            ].join("\n\n     ")
    )
})
