#!/usr/bin/env node

import { exec } from "child_process";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";

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
      // 追加でひな形作成（index.html的なものを追加してみる）
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

        // 現在のファイルを取得
        const __filename = fileURLToPath(import.meta.url);
        // 現在のファイルのディレクトリを取得
        const __dirname = path.dirname(__filename);
        // index.htmlまでのフルパスを取得（現在のディレクトリ配下のindex.htmlの想定）
        const srcPath = path.join(__dirname, "index.html");
        // 対象のフルパスを取得（process.cwd()で対象PCの実行場所を取得し、その配下のindex.htmlを指定）
        const destPath = path.join(process.cwd(), "index.html");

        // copyFileで、現在のindex.htmを、対象の場所にコピー。（index.htmlがない場合は作成される）
        fs.copyFile(srcPath, destPath, (err) => {
          if (err) throw err;
          console.log("index.html is created!");
        });
      });
    }
  });
