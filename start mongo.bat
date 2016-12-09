@ECHO OFF
START "mongod" cmd /k "mongod"
START "mongo" cmd /k "mongo && show dbs"
EXIT