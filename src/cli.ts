import { prompt } from 'inquirer';

export default {
    async NewCommandInput(message: string){
        const command = await prompt({
            name: 'command',
            type: 'input',
            message: `${message}\n> `
        })
    
        return command.command
    },
    
    async askWtihOptions(message: string, args: string[]){
        const Optionask = await prompt({
            name: 'optionAsk',
            type: 'list',
            message: `${message}\n`,
            choices: args
        })
    
        return Optionask.optionAsk
    }
}