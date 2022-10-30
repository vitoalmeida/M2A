import axios from "axios";
import { Email } from "../../redux/diagnostics/types";
import client from "../client";

function getDiagnostics(filter: any) {
  return client("diagnostico/").filter(filter).get();
}

function registerDiagnostic(data: any) {
  return client("diagnostico/").data(data).post();
}

function deleteDiagnostic(diagnosticId: string) {
  return client(`diagnostico/${diagnosticId}/`).delete();
}

function sendEmail(email: Email) {
  axios.post(
    "https://email-sender.onrender.com/email",
    {
      email,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export default {
  getDiagnostics,
  deleteDiagnostic,
  registerDiagnostic,
  sendEmail,
};
