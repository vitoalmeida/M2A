import client from "../client";

function getDiagnostics() {
  return client("diagnostico/").get();
}

function registerDiagnostic(data: any) {
  return client("diagnostico/").data(data).post();
}

export default {
  getDiagnostics,
  registerDiagnostic,
};
