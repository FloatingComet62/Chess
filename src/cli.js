const inquirer = require('inquirer');

module.exports = {
    async NewCommandInput(message){
        const command = await inquirer.prompt({
            name: 'command',
            type: 'input',
            message: `${message}\n> `
        })
    
        return command.command
    },
    
    async askWtihOptions(message, args){
        const Optionask = await inquirer.prompt({
            name: 'optionAsk',
            type: 'list',
            message: `${message}\n`,
            choices: args
        })
    
        return Optionask.optionAsk
    }
}