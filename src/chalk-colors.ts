import {between} from './util';
import faker from 'faker';
import chalk from 'chalk';

const modifiers = [
  "reset",
  "bold",
  "dim",
  "italic",
  "underline",
  "inverse",
  "hidden",
  "strikethrough",
  "visible",
];

const colors = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "blackBright",
  "redBright",
  "greenBright",
  "yellowBright",
  "blueBright",
  "magentaBright",
  "cyanBright",
  "whiteBright",
];

const backgroundColors = [
  "bgBlack",
  "bgRed",
  "bgGreen",
  "bgYellow",
  "bgBlue",
  "bgMagenta",
  "bgCyan",
  "bgWhite",
  "bgBlackBright (alias: bgGray, bgGrey)",
  "bgRedBright",
  "bgGreenBright",
  "bgYellowBright",
  "bgBlueBright",
  "bgMagentaBright",
  "bgCyanBright",
  "bgWhiteBright",
];

export function randomParagraph() {
  const paragraph = faker.lorem.sentence();
  paragraph.split(" ").forEach((curr) => {
    const modifierOn = Math.random() >= 0.5;
    const isColor = Math.random() >= 0.5;
    let tempChalk = chalk;
    if (modifierOn) {
      const randomModifierIndex = between(0, modifiers.length);
      tempChalk = tempChalk[modifiers[randomModifierIndex]];
    }
    const randomStyleIndex = between(0, colors.length);
    if (isColor) {
      tempChalk = tempChalk[colors[randomStyleIndex]];
    } else {
      tempChalk = tempChalk[backgroundColors[randomStyleIndex]];
    }
    try {
      process.stdout.write(tempChalk(curr + " "));
    } catch (Err) {
      process.stdout.write(curr + " ");
    }
  });
}