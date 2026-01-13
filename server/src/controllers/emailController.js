import EmailModel from "../models/emailModel.js";
import {
	createDoc,
	deleteDoc,
	getAllDocs,
	getDocById,
} from "./handlerFactory.js";

// add new email
export const createEmail = createDoc(EmailModel, [
	"userName",
	"userEmail",
	"phoneNumber",
	"subject",
	"emailBody",
]);

// get email by id
export const getEmail = getDocById(EmailModel);

// delete email by id
export const deleteEmail = deleteDoc(EmailModel);

// get all emails
export const getAllEmails = getAllDocs(EmailModel);
