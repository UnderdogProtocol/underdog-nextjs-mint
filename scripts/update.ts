import fs from "fs";
import { underdog } from "./config";
import axios from "axios";

const main = async () => {
  const recovered = JSON.parse(
    fs.readFileSync("./scripts/recovered.json", "utf-8")
  );

  const metadataDir = fs
    .readdirSync("./scripts/metadata")
    .sort((a, b) => parseInt(a.split(".")[0]) - parseInt(b.split(".")[0]));

  for (let i = 0; i < recovered.length; i++) {
    const response = await axios.get(recovered[i]);

    const { name, animation_url, image } = response.data;

    console.log(`Updating ${name}`);

    const metadata = JSON.parse(
      fs.readFileSync(`./scripts/metadata/${metadataDir[i]}`, "utf-8")
    );

    fs.writeFileSync(
      `./scripts/metadata/${metadataDir[i]}`,
      JSON.stringify({ ...metadata, animation_url, image })
    );
  }
};

main();
