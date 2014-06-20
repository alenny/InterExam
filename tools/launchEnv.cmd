cd E:\ZDai\GitHub\InterExam
start cmd /c mongod --dbpath E:\ZDai\MongoDB\data --logpath E:\ZDai\MongoDB\log\db.log --logappend
start cmd /k nodevars.bat 
start cmd /c mongo localhost/interexam