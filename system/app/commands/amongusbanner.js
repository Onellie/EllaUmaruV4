export const setup = {
  name: "amongusbanner",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create a banner game Among Us with your name",
  category: "Banner Generation",
  usages: ["[text] | [text]"],
  mainScreenshot: ["/media/amongusbanner/screenshot/main.jpg"],
  screenshot: ["/media/amongusbanner/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"amongusbanner": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context, prefix, usage}) {
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
  return api.sendMessage({body: context, attachment: await kernel.readStream(["amongusbanner"], {key: key, text1: text1, text2: text2})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}