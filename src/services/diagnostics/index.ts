import client from "../client";

function getDiagnostics() {
  return client("diagnostico/").get();
}

export default {
  getDiagnostics,
};
