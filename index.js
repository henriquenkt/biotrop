
/**
 * Nome da primitiva : invoke
 * Nome do dominio : platform
 * Nome do serviço : conector
 * Nome do tenant : biotropcombr
 **/
const { lambdaEvent, lambdaResponse, PlatformApi } = require("@seniorsistemas/fsw-aws-lambda");

exports.handler = async (event) => {
  let body = lambdaEvent.parseBody(event);
  let input = body.input;
  const eventInfo = lambdaEvent.createEventInfo(event);
  eventInfo.platformToken = "roo9JR3b1MVbJs4PwVCuD3K7cvCXIHsa";
    
  return sendRes(200, JSON.parse(event.body));
    
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

