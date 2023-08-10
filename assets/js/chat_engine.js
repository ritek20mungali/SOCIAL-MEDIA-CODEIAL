// Import the socket.io-client library
// const io = require('socket.io-client');

class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox =$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        this.socket =io.connect('http://localhost:8000');
          

        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        const self =this;

        this.socket.on('connect',function(){
            console.log('connection estblaised using sockets......');

            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined',data)
            });

        });


        $('#send-message').click(function(){
               const msg=$('#chat-message-input').val();
               if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codeial'
                });

               }

        });

        self.socket.on('receive_message',function(data){
            console.group('message recieved',data.message);

            let newMessage =$('<li>');
            let messageType='other-message';

            if(data.user_email=== self.userEmail){
              messageType='self-message';
            }

            newMessage.append($('<span>',{
                'html':data.message
            }));

            newMessage.append($('<sub>',{
                'html':data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);

        })


    }
}



