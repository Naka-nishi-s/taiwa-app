import { exec } from "child_process";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      type: "confirm",
      name: "installType",
      message: "Do you want to install the package of npm?",
      default: false,
    },
  ])
  .then((answer) => {
    if (answer.installType) {
      exec("npm install hello-world-npm", (error, stdout, stderr) => {
        if (error) {
          console.log("エラーです。");
          return;
        }
        if (stderr) {
          console.log("stdエラーです。");
          return;
        }
        console.log(`stdout:${stdout}`);
      });
    }
  });
