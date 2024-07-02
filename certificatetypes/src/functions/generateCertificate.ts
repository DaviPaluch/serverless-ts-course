// 'event' vai ser o responsavel por trazer os dados da nossa requisição para nossa função
// estrutura das funções AWS é baseada em 'event'

import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "../utils/dynamodbClient"

interface ICreateCertificate {
  id: string,
  name: string,
  grade: string
}

export const handler: APIGatewayProxyHandler = async (event) => {

  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate

  //adiciona os dados no banco de dados
  await document
    .put({
      TableName: "user_certificate",
      Item: {
        id,
        name,
        grade,
        created_at: new Date()
      }
    }).promise()

  // 
  const respose = await document.query({
    TableName: "user_certificate",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify(respose.Items[0])
  }
}