cd G:\ZDai\GitHub\InterExam
start cmd /c mongod --dbpath G:\ZDai\MongoDB\data --logpath G:\ZDai\MongoDB\log\db.log --logappend
start cmd /k nodevars.bat 
start cmd /c mongo localhost/interexam