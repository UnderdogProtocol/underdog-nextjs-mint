import fs from "fs";
import { config, underdog } from "./config";
import _ from "lodash";

const parseAttributes = (
  attributes: { trait_type: string; value: string }[]
) => {
  return Object.fromEntries(
    attributes.map(({ trait_type, value }) => [trait_type, value])
  );
};

const main = async () => {
  const projectId = config.projectId;

  const response = await underdog.get(`/v2/projects/${projectId}`);

  const project = response.data;

  console.log(project)

  const metadataDir = fs
    .readdirSync("./scripts/metadata")
    .sort((a, b) => parseInt(a.split(".")[0]) - parseInt(b.split(".")[0]))

  const batches = _.chunk(metadataDir, 99);

  for (const batch of batches) {
    const body = batch.map((file) => {
      const data = JSON.parse(
        fs.readFileSync(`./scripts/metadata/${file}`, "utf-8")
      );

      return {
        name: data.name,
        image: data.image,
        animationUrl: data.animation_url,
        attributes: parseAttributes(data.attributes),
      };
    });

    console.log("First: ", body[0]);
    console.log("Last: ", body[body.length - 1]);

    await underdog.post(`/v2/projects/${projectId}/nfts/batch`, {
      name: project.name,
      image: project.image,
      symbol: project.symbol,
      description: project.description,
      externalUrl: project.externalUrl,
      receiverAddress: config.escrowAddress,
      batch: body,
    });
  }
};

main();
