import { Table } from "https://deno.land/x/cliffy@v0.20.1/mod.ts";
import clear from "https://deno.land/x/clear@v1.2.2/mod.ts";
import { cyan, green, red } from "https://deno.land/std@0.125.0/fmt/colors.ts";
import { DictionaryAPI } from "./dictApi.ts";

const word = "chair";

function display(rows: string[][]) {
  clear(true);
  const table = new Table()
    .body(
      rows,
    ).border(true);

  table.render();
}

function colorise(expected: string, actual: string[]): string[] {
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] == expected[i]) {
      actual[i] = green(actual[i]);
    } else if (expected.includes(actual[i])) {
      actual[i] = cyan(actual[i]);
    } else {
      actual[i] = red(actual[i]);
    }
  }

  return actual;
}

function input(): string {
  let inp = "";

  while (inp.length != 5) {
    inp = prompt("> Enter guess: ")!;
  }

  return inp;
}

async function main() {
  const dictionaryApi = new DictionaryAPI();
  let row = 0;
  const rows = [
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
  ];
  let string = "";

  while (true) {
    display(rows);

    if (string == word) {
      console.log("Success!");
      break;
    } else if (row == 5) {
      console.log("Failure!");
      break;
    }

    string = input();

    while (!(await dictionaryApi.exists(string))) {
      string = input();
    }

    rows[row][0] = string[0];
    rows[row][1] = string[1];
    rows[row][2] = string[2];
    rows[row][3] = string[3];
    rows[row][4] = string[4];
    rows[row] = colorise(word, rows[row]);
    row++;
  }
}

await main();
