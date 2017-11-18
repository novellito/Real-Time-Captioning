module.exports = function (socket){
    socket.on('room', function(data){
        console.log(`user connected on room# ${data.room_id}`);
        socket.join(data.room_id);
    
         socket.on("captionerDelta", del => {
           console.log(del);
           socket.to(data.room_id).emit("captions", del);
        });
    
      }); 
    
      socket.on("disconnect", function() {
        console.log("user disconnected");
      });
}