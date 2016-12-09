@ECHO OFF
START "server" cmd /k "cd makingApi && npm start"
START "client" cmd /k "cd makingClient && npm start"
EXIT