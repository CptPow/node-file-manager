const fs = require("fs");
const yargs = require("yargs");

//CREO
yargs
  .command(
    "write *",
    `node app.js nome-file.txt --body="contenuto..."`,
    (yargs) => {
      return yargs

        .option("body", {
          describe: "Crea un file o aggiunge testo",
          demandOption: true,
          type: "string"
        });
    },
    (argv) => {
      fs.appendFile(process.argv[3], argv.body, () => {
        console.log(new Date(),`: File ${process.argv[3]} creato/modificato.`);
      });
    }
  )
  .help()
  

//LEGGO
  yargs
  .command("read *", "node app.js read nome-file",
  (yargs) => {
    return yargs
  },
    () => {
fs.readFile(process.argv[3], "utf8", function(err, data){
    if (err) {
        console.log(err);
    } else {
        console.log("Contenuto del file:" ,process.argv[3]);
        console.log(data);
    }
})
    }
  )
  .help()
 

  //ELIMINO
  yargs
  .command("delete *", "node app.js delete nome-file",
  (yargs) => {
    return yargs
  },
    () => {
fs.unlink(process.argv[3], err=>{
    if (err) throw err;
     else {
        console.log("File eliminato:" ,process.argv[3]);  
    }
})
    }
  )
  .strict()
  .fail((msg) => {
    console.error(msg);
    
      console.log(`Ecco come utilizzare i comandi disponibili:
      Utilizzo
      1.Scrivere   |   node app.js nome-file.txt --body="contenuto..."
      2.Leggere    |   node app.js read nome-file.txt
      3.Eliminare  |   node app.js delete nome-file.txt`);
    
     
  })

  .help()
  .argv;

