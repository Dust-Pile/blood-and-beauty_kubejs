//priority: 89

// Very Incomplete
ServerEvents.loaded( event => {
    if ( Utils.server.persistentData.mail == undefined ) {
        Utils.server.persistentData.mail = {}
    }
})

if ( global.mail == undefined ) {
    global.mail = {}
}

// TODO: Made command for sending mail
ServerEvents.commandRegistry( event => {

})

// TODO: Recieve mail on login
PlayerEvents.loggedIn( event => {

})

//Main Functions
global.mail.send = ( sender, reciever, message, title ) => {

}
global.mail.notify = ( player ) => {
    
}