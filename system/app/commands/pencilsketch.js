import fs from 'fs';
export const setup = {
  name: "pencilsketch",
  version: "40.0.0",
  permission: "Users",
  creator: "John Lester",
  description: "Create a pencil sketch logo",
  category: "Logo Generation",
  usages: ["[text] | [text]"],
  mainScreenshot: ["/media/pencilsketch/screenshot/main.jpg"],
  screenshot: ["/media/pencilsketch/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"pencilsketch": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context,   prefix, usage}) {
  let text = args.join(" ");
  let text1 = "";
  let text2 = "";
  if(text.includes("|")) {
    text1 = text.split("|")[0].trim();
    text2 = text.split("|")[1].trim();
  } else if(args.length === 0) {
    text = (await Users.getName(event.senderID)).split(" ");
    text1 = text[0];
    text2 = text[1];
  } else {
    return usage(this, prefix, event);
  }
  await umaru.createJournal(event);
  let image = await kernel.readStream(["pencilsketch"], {key: key, text1: text1, text2: text2});
  let path = umaru.sdcard + "/Pictures/"+keyGenerator()+".jpg";
  await kernel.writeStream(path, image);
  return api.sendMessage({body: context, attachment: fs.createReadStream(path)}, event.threadID, async() => {
    await umaru.deleteJournal(event);
    await fs.promises.unlink(path);
  }, event.messageID)
}