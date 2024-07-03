var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/functions/generateCertificate.ts
var generateCertificate_exports = {};
__export(generateCertificate_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(generateCertificate_exports);

// src/utils/dynamodbClient.ts
var import_aws_sdk = require("aws-sdk");
var options = {
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: "x",
  secretAccessKey: "x"
};
var document = new import_aws_sdk.DynamoDB.DocumentClient(options);

// src/functions/generateCertificate.ts
var handler = async (event) => {
  const { id, name, grade } = JSON.parse(event.body);
  await document.put({
    TableName: "users_certificate",
    Item: {
      id,
      name,
      grade,
      created_at: (/* @__PURE__ */ new Date()).getTime()
    }
  }).promise();
  const respose = await document.query({
    TableName: "users_certificate",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();
  return {
    statusCode: 201,
    body: JSON.stringify(respose.Items[0])
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=generateCertificate.js.map
