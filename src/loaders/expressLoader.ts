import path from "path";
import glob from "glob";
import _ from "lodash";
import {
  MicroframeworkLoader,
  MicroframeworkSettings,
} from "microframework-w3tec";

//import { env } from "../env";

export const expressLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
) => {
  if (settings) {
    const expressApp = settings.getData("express_app");

    // [START routes]
    const filePattern: string = path.resolve(
      "src/controllers/*Controller.{ts,js}",
    );
    glob(filePattern, (err, files) => {
      files.forEach((file) => {
        const controller = require(file);
        if (_.isFunction(controller.routes)) {
          controller.routes(expressApp);
        }
      });
    });
    // [END routes]
  }
};
