import { underdog } from "./config";
import _ from "lodash";

const main = async () => {
  const response = await underdog.post(`/v2/projects`, {
    name: "Forever Shapes",
    symbol: "SHAPES",
    image:
      "https://updg8.storage.googleapis.com/e55354a3-c148-4915-9371-eed2a840fe4b",
    description:
      "Forever Shapes 5,000 piece art collection. Small Sci-Fi Experiences.",
    externalUrl: "https://forevershapes.com",
    animationUrl: "https://forevershapes.com/videos/726.mp4"
  });

  console.log(response.data);
};

main();
