/**
 * Nome da primitiva : invoke
 * Nome do dominio : platform
 * Nome do serviço : conector
 * Nome do tenant : biotropcombr
 **/

const { lambdaEvent, lambdaResponse, PlatformApi } = require("@seniorsistemas/fsw-aws-lambda");

exports.handler = async (event) => {
  let bodyEvent = lambdaEvent.parseBody(event);
  const eventInfo = lambdaEvent.createEventInfo(event);
  let token;

  const inputData = {
    server: "https://web26.seniorcloud.com.br:39501",
    port: "Colaboradores",
    service: "Biotrop.g5.guppy",
    user: "lucas.pereira",
    encryption: "0",
    password: "Mari@2025",
    module: "rubi",
  };

  const body = {
    inputData: {
      ...bodyEvent,
      ...inputData,
    },
    id: "f2200c3b-c7df-4040-9613-34f697b75889",
    configurationId: "3c13a7fe-90b9-4703-b09c-a368c2b1df93",
  };

  try {
    result = await PlatformApi.Post(eventInfo, `/platform/authentication/actions/loginWithKey`, {
      accessKey: "ce44ef89-8ea4-43ac-883a-8fdf55938780",
      secret: "c5dfc877-0aea-4a37-b883-d28e2107405b",
      tenantName: "biotropcombr",
    });
    resultString = JSON.parse(result.jsonToken);
    eventInfo.platformToken = resultString.access_token;
    eventInfo.tenantName = "biotropcombr";
  } catch (erro) {
    console.error("Erro ao recuperar token:", erro.response.statusText);
    return sendRes(erro.response.status, "Erro ao recuperar token:" + erro.response.statusText);
  }

  try {
    retorno = await PlatformApi.Post(eventInfo, `/platform/conector/actions/invoke`, body);
  } catch (erro) {
    console.error("Erro ao processar API conector Cloud9:", erro.response.statusText);
    return sendRes(erro.response.status, "Erro ao processar API conector Cloud9:" + erro.response.statusText);
  }

  return sendRes(200, body);
};

// Retorna
const sendRes = (status, body) => {
  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  };
  return response;
};
