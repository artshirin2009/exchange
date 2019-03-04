var fs = require('fs')
const dir = './change-routes';

dataToChange = /new-text-2/g;
newData = 'newData';
fs.readdir(dir, (err, files) => {
    files.forEach(file => {
        let path = `${dir}/${file}`
        fs.readFile(path, 'utf8', function (err, data) {

            if (err) {
                return console.log(err);
            }
            
            var result = data.replace(dataToChange, newData);

            fs.writeFile(path, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });
    });
});



