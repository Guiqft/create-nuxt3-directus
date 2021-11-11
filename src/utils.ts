import chalk from "chalk"
import * as fs from "fs"
import * as path from "path"
import * as ejs from "ejs"

export const CURR_DIR = process.cwd()

export const createProject = (projectPath: string) => {
    if (fs.existsSync(projectPath)) {
        console.log(
            chalk.red(
                `Folder ${projectPath} exists. Delete or use another name.`
            )
        )
        return false
    }
    fs.mkdirSync(projectPath)

    return true
}

// list of file/folder that should not be copied
const SKIP_FILES = ["node_modules", ".nuxt", ".template.json"]
export const createDirectoryContents = (
    templatePath: string,
    projectName: string
) => {
    // read all files/folders (1 level) from template folder
    const filesToCreate = fs.readdirSync(templatePath)
    // loop each file/folder
    filesToCreate.forEach((file) => {
        const origFilePath = path.join(templatePath, file)

        // get stats about the current file
        const stats = fs.statSync(origFilePath)

        // skip files that should not be copied
        if (SKIP_FILES.indexOf(file) > -1) return

        if (stats.isFile()) {
            // read file content and transform it using template engine
            let contents = fs.readFileSync(origFilePath, "utf8")
            contents = render(contents, { projectName })
            // write file to destination folder
            const writePath = path.join(CURR_DIR, projectName, file)
            fs.writeFileSync(writePath, contents, "utf8")
        } else if (stats.isDirectory()) {
            // create folder in destination folder
            fs.mkdirSync(path.join(CURR_DIR, projectName, file))
            // copy files/folder inside current folder recursively
            createDirectoryContents(
                path.join(templatePath, file),
                path.join(projectName, file)
            )
        }
    })
}

export interface TemplateData {
    projectName: string
}
export const render = (content: string, data: TemplateData) => {
    return ejs.render(content, data)
}
