import client from "../client";

function getDiagnostics() {
  return client("diagnostico/").get();
}

function registerDiagnostic(data: any) {
  return client("diagnostico/").data(data).post();
}

function deleteDiagnostic(diagnosticId: string) {
  return client(`diagnostico/${diagnosticId}/`).delete();
}

export default {
  getDiagnostics,
  deleteDiagnostic,
  registerDiagnostic,
};
