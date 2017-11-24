module.exports = function (socket){


    socket.on('room', function(data){
    
        console.log(`user connected on room# ${data.room_id}`);
        console.log(data.user);
     
        socket.join(data.room_id);

        socket.on("updateContent", data => {
          socket.emit("getContent", currentContent);
          // console.log(currentContent);
        });
    
         socket.on("captionerDelta", del => {
          //  console.log(del.content);
           socket.to(data.room_id).emit("captions", del);
        });
    
      }); 
    
      socket.on("disconnect", function() {
        console.log("user disconnected");
      });
}