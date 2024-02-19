import { config, underdog } from "./config";
import _ from "lodash";

const main = async () => {
  const response = await underdog.patch(
    `/v2/projects/${config.projectId}/metadata`,
    {
      sellerFeeBasisPoints: 500,
    }
  );

  console.log(response.data);
};

main();
